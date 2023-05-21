onmessage = function (e) {
  console.log(e.data);

  switch (e.data.command) {
    case 'compress':
      compress(e.data);
      break;
  }
};

async function compress(data) {
  const { blobImgs, canvas: offscreenCanvas } = data;
  const context = offscreenCanvas.getContext('2d');

  const compressedImgs = await Promise.all(blobImgs.map(async blobImg => {
    const img = await createImageBitmap(blobImg);

    offscreenCanvas.width = img.width;
    offscreenCanvas.height = img.height;

    context.drawImage(img, 0, 0, img.width, img.height);

    // 没有toDataURL方法，用convertToBlob压缩，再用FileReader转成base64
    return await offscreenCanvas.convertToBlob({ type: 'image/jpeg', quality: 0.75 });
  }))

  postMessage(compressedImgs);
}
