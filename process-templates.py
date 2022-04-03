import sys
from concurrent.futures import process
import png

def append_pixel(dest, py, r, g, b, a):
    dest[py * 3].append(0)
    dest[py * 3].append(0)
    dest[py * 3].append(0)
    dest[py * 3].append(0)

    dest[py * 3 + 1].append(r)
    dest[py * 3 + 1].append(g)
    dest[py * 3 + 1].append(b)
    dest[py * 3 + 1].append(a)
    
    dest[py * 3 + 2].append(0)
    dest[py * 3 + 2].append(0)
    dest[py * 3 + 2].append(0)
    dest[py * 3 + 2].append(0)

def process_template(name):
    source = png.Reader(filename="./templates/" + name)
    [width,height,rows,info] = source.asRGBA()
    dest = []
    py = 0
    for row in rows:
        dest.append([])
        dest.append([])
        dest.append([])
        for px in range(0, width):
            [r, g, b, a] = row[(px * 4):(px * 4 + 4)]
            append_pixel(dest, py, 0, 0, 0, 0)
            append_pixel(dest, py, r, g, b, a)
            append_pixel(dest, py, 0, 0, 0, 0)
        py += 1
    overlay = png.from_array(dest, 'RGBA')
    overlay.save("./overlays/" + name)


process_template(sys.argv[1])