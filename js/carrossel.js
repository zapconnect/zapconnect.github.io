const downloadButton = document.getElementById("downloadCarousel");
const downloadStatus = document.getElementById("downloadStatus");
const slides = Array.from(document.querySelectorAll("[data-slide]"));

async function waitForAssets() {
  const images = Array.from(document.images);
  const imagePromises = images.map((image) => {
    if (image.complete) {
      return Promise.resolve();
    }

    return image.decode().catch(() => {
      return new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    });
  });

  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  await Promise.all(imagePromises);
}

async function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
        return;
      }

      reject(new Error("Nao foi possivel gerar o arquivo PNG."));
    }, "image/png");
  });
}

async function exportSlides() {
  if (typeof html2canvas !== "function" || typeof JSZip !== "function") {
    throw new Error("As bibliotecas de exportacao nao foram carregadas.");
  }

  await waitForAssets();

  const zip = new JSZip();

  for (let index = 0; index < slides.length; index += 1) {
    const slide = slides[index];
    const filename = slide.dataset.filename || `slide-${index + 1}`;
    const scale = 1080 / slide.offsetWidth;

    downloadStatus.textContent = `Gerando slide ${index + 1} de ${slides.length}...`;

    const canvas = await html2canvas(slide, {
      scale,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      width: slide.offsetWidth,
      height: slide.offsetHeight,
      windowWidth: document.documentElement.clientWidth,
      windowHeight: document.documentElement.clientHeight,
      scrollX: 0,
      scrollY: -window.scrollY
    });

    const blob = await canvasToBlob(canvas);
    zip.file(`${filename}.png`, blob);
  }

  downloadStatus.textContent = "Compactando o carrossel...";

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");

  link.href = url;
  link.download = "carrossel-zapconnect.zip";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

if (downloadButton) {
  downloadButton.addEventListener("click", async () => {
    downloadButton.disabled = true;
    downloadButton.textContent = "Gerando arquivos...";

    try {
      await exportSlides();
      downloadStatus.textContent = "Carrossel baixado com sucesso.";
    } catch (error) {
      downloadStatus.textContent = "Nao consegui exportar o carrossel. Recarregue a pagina e tente novamente.";
      console.error(error);
    } finally {
      downloadButton.disabled = false;
      downloadButton.textContent = "Baixar carrossel completo";
    }
  });
}
