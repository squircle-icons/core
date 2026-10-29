"""Import an owner-authored Figma SVG export without redrawing its artwork.

The native icon frames export separately. The original raw Square vectors have
no frame export setting; recover those two named layers from the named board SVG
and translate their existing grid cells onto the same 24-unit canvas.
"""
import argparse
import copy
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--archive', type=Path, required=True)
parser.add_argument('--board', type=Path, required=True)
parser.add_argument('--inventory', type=Path, required=True)
args = parser.parse_args()
inventory = json.loads(args.inventory.read_text())
assert len(inventory) == 162
ET.register_namespace('', 'http://www.w3.org/2000/svg')
ns = '{http://www.w3.org/2000/svg}'
board = ET.parse(args.board).getroot()
archive = zipfile.ZipFile(args.archive)
assert len(archive.namelist()) == 160
destination = root / 'icons' / 'figma-study'
destination.mkdir(parents=True, exist_ok=True)
records = []
for row in inventory:
    key, style = row['key'], row['style']
    if key == 'square':
        layer = next(n for n in board.iter() if n.get('id') == f'square-{style}')
        svg = ET.Element(ns + 'svg', {'width': '24', 'height': '24', 'viewBox': '0 0 24 24', 'fill': 'none'})
        cell_x = 24 if style == 'outline' else 56
        translated = ET.SubElement(svg, ns + 'g', {'transform': f'translate({-cell_x} -24)'})
        translated.append(copy.deepcopy(layer))
        raw = ET.tostring(svg, encoding='unicode') + '\n'
        member = f'board:square-{style}'
    else:
        member = row['name'].replace(' / ', '/') + '.svg'
        raw = archive.read(member).decode()
        svg = ET.fromstring(raw)
    assert svg.get('viewBox') == '0 0 24 24', (key, style)
    assert svg.get('width') == svg.get('height') == '24', (key, style)
    assert not re.search(r'<(?:script|image|foreignObject)\b|on\w+=|(?:href|src)=', raw), key
    path = destination / key / f'{style}.svg'
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(raw)
    records.append({
        'id': key,
        'label': 'Square' if key == 'square' else row['name'].split(' / ')[0],
        'group': row['group'],
        'style': style,
        'nodeId': row['nodeId'],
        'source': str(path.relative_to(root)),
        'sha256': hashlib.sha256(raw.encode()).hexdigest(),
        'exportMember': member,
    })
assert len({(r['id'], r['style']) for r in records}) == 162
manifest = {
    'fileKey': '5H3BjvQHvoTlkqp73YNx17',
    'canvas': [24, 24],
    'baseStroke': 1.5,
    'exported': '2026-10-29',
    'archiveSHA256': hashlib.sha256(args.archive.read_bytes()).hexdigest(),
    'boardSHA256': hashlib.sha256(args.board.read_bytes()).hexdigest(),
    'normalization': 'Native frame SVGs unchanged. Square retains its named board paths with grid-cell translation only. No scaling or redraw.',
    'records': records,
}
(destination / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Imported {len(records)} drawings / {len(records)//2} pairs from the live Figma board.')
