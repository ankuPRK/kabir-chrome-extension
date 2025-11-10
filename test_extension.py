#!/usr/bin/env python3
"""
Test script for Kabir Doha Chrome Extension
Verifies that all required files are present and valid
"""

import os
import json
import sys
from pathlib import Path

def test_file_exists(file_path, description):
    """Test if a file exists"""
    if os.path.exists(file_path):
        print(f"✅ {description}: {file_path}")
        return True
    else:
        print(f"❌ {description}: {file_path} - MISSING")
        return False

def test_json_file(file_path, description):
    """Test if a JSON file is valid"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            json.load(f)
        print(f"✅ {description}: {file_path} - Valid JSON")
        return True
    except Exception as e:
        print(f"❌ {description}: {file_path} - Invalid JSON: {e}")
        return False

def test_manifest():
    """Test manifest.json"""
    print("\n🔍 Testing manifest.json...")
    if not test_file_exists("manifest.json", "Manifest file"):
        return False
    
    try:
        with open("manifest.json", 'r') as f:
            manifest = json.load(f)
        
        required_fields = ["manifest_version", "name", "version", "chrome_url_overrides"]
        for field in required_fields:
            if field not in manifest:
                print(f"❌ Missing required field: {field}")
                return False
        
        print("✅ Manifest structure is valid")
        return True
    except Exception as e:
        print(f"❌ Manifest validation failed: {e}")
        return False

def test_src_files():
    """Test source files"""
    print("\n🔍 Testing source files...")
    src_files = [
        ("src/newtab.html", "HTML file"),
        ("src/newtab.css", "CSS file"),
        ("src/newtab.js", "JavaScript file")
    ]
    
    all_exist = True
    for file_path, description in src_files:
        if not test_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def test_doha_files():
    """Test doha files"""
    print("\n🔍 Testing doha files...")
    dohas_dir = Path("dohas")
    if not dohas_dir.exists():
        print("❌ Dohas directory missing")
        return False
    
    # Test manifest file
    manifest_path = dohas_dir / "manifest.json"
    if not test_json_file(manifest_path, "Doha manifest file"):
        return False
    
    # Validate manifest structure and check that all listed files exist
    try:
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
        
        if "dohaFiles" not in manifest:
            print("❌ Manifest missing 'dohaFiles' field")
            return False
        
        doha_files_list = manifest["dohaFiles"]
        print(f"Manifest lists {len(doha_files_list)} doha files")
        
        # Check that all files in manifest exist
        missing_files = []
        for file_name in doha_files_list:
            file_path = dohas_dir / file_name
            if not file_path.exists():
                missing_files.append(file_name)
        
        if missing_files:
            print(f"❌ Manifest lists files that don't exist: {', '.join(missing_files)}")
            return False
        
    except Exception as e:
        print(f"❌ Error reading manifest: {e}")
        return False
    
    # Test all doha files
    doha_files = list(dohas_dir.glob("doha_*.json"))
    if not doha_files:
        print("❌ No doha files found")
        return False
    
    print(f"Found {len(doha_files)} doha files")
    
    all_valid = True
    for doha_file in doha_files:
        if not test_json_file(doha_file, f"Doha file {doha_file.name}"):
            all_valid = False
        else:
            # Test doha structure
            try:
                with open(doha_file, 'r', encoding='utf-8') as f:
                    doha = json.load(f)
                
                required_fields = ["hindi", "english", "translation"]
                for field in required_fields:
                    if field not in doha:
                        print(f"❌ {doha_file.name} missing field: {field}")
                        all_valid = False
                        break
            except Exception as e:
                print(f"❌ Error reading {doha_file.name}: {e}")
                all_valid = False
    
    return all_valid

def test_icons():
    """Test icon files"""
    print("\n🔍 Testing icon files...")
    icon_files = [
        ("icons/icon16.png", "16x16 icon"),
        ("icons/icon48.png", "48x48 icon"),
        ("icons/icon128.png", "128x128 icon")
    ]
    
    all_exist = True
    for file_path, description in icon_files:
        if not test_file_exists(file_path, description):
            all_exist = False
    
    return all_exist

def main():
    """Run all tests"""
    print("🚀 Testing Kabir Doha Chrome Extension")
    print("=" * 50)
    
    tests = [
        test_manifest,
        test_src_files,
        test_doha_files,
        test_icons
    ]
    
    all_passed = True
    for test in tests:
        if not test():
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 All tests passed! Extension is ready for deployment.")
        print("\nNext steps:")
        print("1. Open Chrome and go to chrome://extensions/")
        print("2. Enable Developer mode")
        print("3. Click 'Load unpacked' and select this directory")
        print("4. Open a new tab to test the extension")
    else:
        print("❌ Some tests failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
