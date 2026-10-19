"""The static build preserves existing site bytes and omits repository machinery."""
import hashlib
from pathlib import Path
import sys
import tempfile
import unittest
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'.github/pages'))
import build_static

class StaticBuildTest(unittest.TestCase):
    def test_existing_site_files_are_preserved_byte_for_byte(self):
        with tempfile.TemporaryDirectory() as directory:
            output=Path(directory)/'_site'
            build_static.build(ROOT,output)
            self.assertEqual((output/'CNAME').read_text().strip(),'oxiomsystems.com')
            self.assertFalse((output/'.github').exists())
            self.assertFalse((output/'tests').exists())
            for name in build_static.FILES:
                source=ROOT/name
                for original in ([source] if source.is_file() else source.rglob('*')):
                    if original.is_file():
                        self.assertEqual(hashlib.sha256(original.read_bytes()).digest(),hashlib.sha256((output/original.relative_to(ROOT)).read_bytes()).digest())

    def test_source_link_is_refused_without_creating_output(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);(root/'index.html').symlink_to(ROOT/'index.html')
            output=root/'_site'
            with self.assertRaises(ValueError):build_static.build(root,output)
            self.assertFalse(output.exists())

if __name__=='__main__':unittest.main()
