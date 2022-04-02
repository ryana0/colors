const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const letterHex = ['A', 'B', 'C', 'D', 'E', 'F']

function generateHex() {
    color = ['#']
    for(i = 0; i < 6; i++) {
        num = Math.round(Math.random() * 15)
        if(num > 9) {
            color.push(letterHex[num - 10])
        } else {
            color.push(num)
        }
    }
    return color.join('')
}

for(k = 0; k < 100; k++) {
    //k is row
    for(j = 0; j < 100; j++) {
        //j is column
        ctx.fillStyle = generateHex()
        ctx.fillRect(k * 5, j * 2.5, 5, 2.5)
    }
}

function newColorBlock(color, el) {
    text = document.createElement('h1')
    text.classList.add('blockText')
    text.textContent = color

    console.log(color)
    block = document.createElement('div')
    block.classList.add('colorBlock')
    block.style.backgroundColor = color
    document.querySelector(el).appendChild(block)
    block.appendChild(text)
}

for(b = 0; b < 10; b++) {
    newColorBlock(generateHex(), '#thing')
}


let startInput = false
let destinationInput = false

const range = document.getElementById('steps')
    if(range) {
        range.addEventListener('change', () => {
            if(!destinationInput && !startInput) return;
            console.log(range.value)
            colors = steppedGradient(range.value, start.value, destination.value)
            console.log(colors)
            for(i = 0; i < colors.length; i++) {
                newColorBlock(colors[i])
            }
        })
    }

    const start = document.querySelector('#start')
    const destination = document.querySelector('#destination')
    changeStart = start.addEventListener('change', () => {
        if(start.value.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$") && !startInput) {
            startInput = true
            newColorBlock(start.value, 'section')
            start.removeEventListener('change', changeStart)
        }
    })

    changeDest = destination.addEventListener('change', () => {
        if(start.value.match("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$") && !destinationInput && startInput) {
            destinationInput = true
            destination.removeEventListener('change', changeDest)
            console.log(range.value)
            startArray = start.value.split('')
            startArray.shift()
            endArray = destination.value.split('')
            endArray.shift()
            colors = steppedGradient(range.value, startArray.join(''), endArray.join('')).content
            if(!colors.adding) colors.reverse()
            console.log(colors)
            colors.forEach(color => {
                newColorBlock('#' + color, 'section')
            })
        }
    })


function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

function steppedGradient(steps, start, end) {
    rgbStart = hexToRgb(start).split(',')
    rgbEnd = hexToRgb(end).split(',')
    console.log(rgbEnd[0])
    addingX = false
    addingY = false
    addingZ = false

    if(rgbStart[0] > rgbEnd[0]) {
        stepsFracX = (rgbStart[0] - rgbEnd[0]) / steps
    } else {
        stepsFracX = (rgbStart[0] + rgbEnd[0]) / steps
        addingX = true
    }

    if(rgbStart[1] > rgbEnd[1]) {
        stepsFracY = (rgbStart[1] - rgbEnd[1]) / steps
    } else {
        stepsFracY = (rgbStart[1] + rgbEnd[1]) / steps
        addingY = true
    }

    if(rgbStart[2] > rgbEnd[2]) {
        stepsFracZ = (rgbStart[2] - rgbEnd[2]) / steps
    } else {
        stepsFracZ = (rgbStart[2] + rgbEnd[2]) / steps
        addingZ = true
    }

    console.log(addingX, addingY, addingZ)

    console.log(stepsFracX, stepsFracY, stepsFracZ)
    console.log(rgbEnd[0] , rgbStart[0])
    colors = []
    for(i = 0; i < steps; i++) {
        for(j = 0; j < 3; j++) {
            color = []
            if(!addingX && !addingY && !addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (i))))
                color.push(Math.round(Math.abs(stepsFracY * (i))))
                color.push(Math.round(Math.abs(stepsFracZ * (i))))
            } else if (addingX && !addingY && !addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracY * (i))))
                color.push(Math.round(Math.abs(stepsFracZ * (i))))
            } else if (!addingX && addingY && !addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (i))))
                color.push(Math.round(Math.abs(stepsFracY * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracZ * (i))))
            } else if (!addingX && !addingY && addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (i))))
                color.push(Math.round(Math.abs(stepsFracY * (i))))
                color.push(Math.round(Math.abs(stepsFracZ * (steps - i))))
            } else if (addingX && addingY && !addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracY * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracZ * (i))))
            } else if (addingX && !addingY && addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracY * (i))))
                color.push(Math.round(Math.abs(stepsFracZ * (steps - i))))
            } else if (!addingX && addingY && addingZ) {
                color.push(Math.round(Math.abs(stepsFracX * (i))))
                color.push(Math.round(Math.abs(stepsFracY * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracZ * (steps - i))))
            } else {
                color.push(Math.round(Math.abs(stepsFracX * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracY * (steps - i))))
                color.push(Math.round(Math.abs(stepsFracZ * (steps - i))))
            }
            console.log(color)
            if (j == 2) {
                colors.push(rgbToHex(color[0], color[1], color[2]))
            }
        } 
        
    }
    return {content: colors, adding: addingX == false|| addingY == false || addingZ == false ? false : true}
}