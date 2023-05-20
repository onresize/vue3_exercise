
importScripts('spark-md5.js')

onmessage = e => {
  const { chunks } = e.data
  const spark = new SparkMD5.ArrayBuffer()
  console.log('子线程接收消息----------', e)

  let count = 0

  const loadNext = index => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(chunks[index].file)
    reader.onload = e => {
      count++
      spark.append(e.target.result)
      if (count == chunks.length) {
        postMessage({
          hash: spark.end()
        })
      } else {
        loadNext(count)
      }
    }
  }
  loadNext(0)
}
