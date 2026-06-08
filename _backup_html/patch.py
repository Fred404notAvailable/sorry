import os
import re

files = ["index.html", "reasons.html", "promises.html", "forgive.html", "journey.html", "letter.html"]

def replace_nav(html):
    # Regex to find the <nav>...</nav>
    nav_pattern = re.compile(r'(<nav[^>]*>)(.*?)(</nav>)', re.DOTALL)
    
    def repl(m):
        nav_start = m.group(1)
        nav_content = m.group(2)
        nav_end = m.group(3)
        
        # Replace <div class="flex flex-col items-center...">...Home...</div>
        nav_content = re.sub(
            r'<div( class="[^"]*?")>(\s*<span[^>]*>home</span>\s*<span[^>]*>Home</span>\s*)</div>',
            r'<a href="index.html"\1>\2</a>',
            nav_content
        )
        
        # Reasons
        nav_content = re.sub(
            r'<div( class="[^"]*?")>(\s*<span[^>]*>favorite</span>\s*<span[^>]*>Reasons</span>\s*)</div>',
            r'<a href="reasons.html"\1>\2</a>',
            nav_content
        )
        
        # Promises
        nav_content = re.sub(
            r'<div( class="[^"]*?")>(\s*<span[^>]*>auto_stories</span>\s*<span[^>]*>Promises</span>\s*)</div>',
            r'<a href="promises.html"\1>\2</a>',
            nav_content
        )
        
        # Date
        nav_content = re.sub(
            r'<div( class="[^"]*?")>(\s*<span[^>]*>(?:calendar_meal|calendar_heart)</span>\s*<span[^>]*>Date</span>\s*)</div>',
            r'<a href="forgive.html"\1>\2</a>',
            nav_content
        )
        
        return nav_start + nav_content + nav_end
    
    return nav_pattern.sub(repl, html)


for f in files:
    if not os.path.exists(f):
        print(f"File {f} not found!")
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # 1. Update Bottom Nav
    content = replace_nav(content)
    
    # 2. Update Footer Links
    content = re.sub(
        r'<a class="([^"]*)" href="#">Our Story</a>',
        r'<a class="\1" href="journey.html">Our Story</a>',
        content
    )
    content = re.sub(
        r'<a class="([^"]*)" href="#">Contact Me</a>',
        r'<a class="\1" href="letter.html">Contact Me</a>',
        content
    )
    content = re.sub(
        r'<a class="([^"]*)" href="#">Privacy</a>',
        r'<a class="\1" href="javascript:void(0)">Privacy</a>',
        content
    )
    content = re.sub(
        r'<a class="([^"]*)" href="#">Terms of Heart</a>',
        r'<a class="\1" href="javascript:void(0)">Terms of Heart</a>',
        content
    )
    
    # 3. Update CTAs in index.html
    if f == "index.html":
        content = re.sub(
            r'<button class="([^"]*)">\s*See Why I Love You\s*</button>',
            r'<a href="reasons.html" class="\1 flex items-center justify-center text-center">See Why I Love You</a>',
            content
        )
        content = re.sub(
            r'<button class="([^"]*)">\s*Read My Promises\s*</button>',
            r'<a href="promises.html" class="\1 flex items-center justify-center text-center">Read My Promises</a>',
            content
        )
    
    # 4. Top Nav links on desktop
    content = re.sub(r'<a class="([^"]*)" href="#">Home</a>', r'<a class="\1" href="index.html">Home</a>', content)
    content = re.sub(r'<a class="([^"]*)" href="#">Reasons</a>', r'<a class="\1" href="reasons.html">Reasons</a>', content)
    content = re.sub(r'<a class="([^"]*)" href="#">Promises</a>', r'<a class="\1" href="promises.html">Promises</a>', content)
    content = re.sub(r'<a class="([^"]*)" href="#">Timeline</a>', r'<a class="\1" href="journey.html">Timeline</a>', content)
    content = re.sub(r'<a class="([^"]*)" href="#">Letter</a>', r'<a class="\1" href="letter.html">Letter</a>', content)

    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Patching complete.")
