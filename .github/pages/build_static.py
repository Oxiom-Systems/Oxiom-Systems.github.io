"""Copy the existing static site and reject links instead of dereferencing them."""
from pathlib import Path
import shutil

FILES = ('index.html', 'thanks.html', 'traceweaver-course-access.html', 'scripts.js', 'styles.css', 'favicon.svg', 'CNAME', '.nojekyll', 'assets')
def build(root=Path('.'), output=Path('_site')):
    root = Path(root); output = Path(output)
    if output.exists(): raise ValueError('site output already exists')
    paths = []
    for name in FILES:
        source = root/name
        if not source.exists() or source.is_symlink(): raise ValueError('static source missing or linked')
        for child in [source] + (list(source.rglob('*')) if source.is_dir() else []):
            if child.is_symlink() or not (child.is_file() or child.is_dir()): raise ValueError('static source link or special file')
        paths.append(source)
    if (root/'CNAME').read_text().strip() != 'oxiomsystems.com': raise ValueError('custom domain changed')
    output.mkdir()
    for source in paths:
        target=output/source.name
        if source.is_dir(): shutil.copytree(source,target)
        else: shutil.copyfile(source,target)
if __name__ == '__main__': build()
