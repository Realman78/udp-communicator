const imgs = [
    `https://th-thumbnailer.cdn-si-edu.com/UAJEu9vQxdwwIi8XyBiSQmysTtk=/fit-in/1600x0/filters:focal(582x120:583x121)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d6/7d/d67d186f-f5f3-4867-82c5-2c772120304f/thanos-snap-featured-120518-2.jpg`,
    `https://www.cnet.com/a/img/resize/3d8eccb08166ff0c05b50c91c5f1785dcc341796/2018/03/12/a98bea48-0cec-4492-be58-ea94a7aace65/avengers-infinity-war-thanos-smash.jpg?auto=webp&fit=crop&height=528&width=940`,
    `https://i.ytimg.com/vi/N2YTmooNR8E/maxresdefault.jpg`,
    `https://i.insider.com/5aeb60957708e921e51912a5?width=700`,
    `https://www.fxguide.com/wp-content/uploads/2019/05/thanos3.jpg`
]

const wsClient = new WebSocket('ws://localhost:8080')
const imageContainer = document.getElementById('imgs')
let i = 0;
let mt = ml = 0;
wsClient.onopen = () => {
    wsClient.send('hello')
}
wsClient.onmessage = (data) => {
    const message = data.data
    if (message == 'left') {
        ml-=10
        imageContainer.style.marginLeft = ml+'px'
    }
    else if (message == 'right') {
        ml+=10
        imageContainer.style.marginLeft = ml+'px'
    }
    else if (message == 'up') {
        mt-=10
        imageContainer.style.marginTop = mt+'px'
    }
    else if (message == 'down') {
        mt+=10
        imageContainer.style.marginTop = mt+'px'
    } else {
        i++
        imageContainer.src = imgs[i % imgs.length]
    }
}
