import os
import re

files = {
    "index.html": "home",
    "reasons.html": "favorite",
    "promises.html": "auto_stories",
    "forgive.html": "calendar_meal", # or calendar_heart
    "journey.html": "", # Maybe no active tab or timeline?
    "letter.html": ""
}

def generate_nav(active_id):
    nav = '''<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 max-w-[800px] mx-auto left-1/2 -translate-x-1/2 bg-surface-container dark:bg-on-background border-t border-outline-variant/20 rounded-t-xl shadow-[0_-4px_12px_rgba(134,78,90,0.1)]">
<a href="index.html" class="flex flex-col items-center justify-center {home_cls} px-4 py-1 transition-all duration-300">
<span class="material-symbols-outlined"{home_style}>home</span>
<span class="font-label-md text-label-md">Home</span>
</a>
<a href="reasons.html" class="flex flex-col items-center justify-center {reasons_cls} px-4 py-1 transition-all duration-300">
<span class="material-symbols-outlined"{reasons_style}>favorite</span>
<span class="font-label-md text-label-md">Reasons</span>
</a>
<a href="promises.html" class="flex flex-col items-center justify-center {promises_cls} px-4 py-1 transition-all duration-300">
<span class="material-symbols-outlined"{promises_style}>auto_stories</span>
<span class="font-label-md text-label-md">Promises</span>
</a>
<a href="forgive.html" class="flex flex-col items-center justify-center {forgive_cls} px-4 py-1 transition-all duration-300">
<span class="material-symbols-outlined"{forgive_style}>calendar_heart</span>
<span class="font-label-md text-label-md">Date</span>
</a>
</nav>'''
    
    active_cls = "bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-full scale-110 active:scale-95"
    inactive_cls = "text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors"
    
    active_style = ' style="font-variation-settings: \'FILL\' 1;"'
    
    return nav.format(
        home_cls=active_cls if active_id == "index" else inactive_cls,
        home_style=active_style if active_id == "index" else "",
        
        reasons_cls=active_cls if active_id == "reasons" else inactive_cls,
        reasons_style=active_style if active_id == "reasons" else "",
        
        promises_cls=active_cls if active_id == "promises" else inactive_cls,
        promises_style=active_style if active_id == "promises" else "",
        
        forgive_cls=active_cls if active_id == "forgive" else inactive_cls,
        forgive_style=active_style if active_id == "forgive" else ""
    )

for f in files.keys():
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace nav
    page_id = f.replace(".html", "")
    content = re.sub(r'<!-- BottomNavBar -->\s*<nav.*?</nav>', generate_nav(page_id), content, flags=re.DOTALL)
    
    # Fix remaining a href="#" that we missed because they didn't have class attributes exactly matching
    # Or just replace all `<a class="..." href="#">Our Story</a>` more robustly
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Our Story</a>', r'<a\1href="journey.html"\2>Our Story</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Contact Me</a>', r'<a\1href="letter.html"\2>Contact Me</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Privacy</a>', r'<a\1href="javascript:void(0)"\2>Privacy</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Terms of Heart</a>', r'<a\1href="javascript:void(0)"\2>Terms of Heart</a>', content)
    
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Home</a>', r'<a\1href="index.html"\2>Home</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Reasons</a>', r'<a\1href="reasons.html"\2>Reasons</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Promises</a>', r'<a\1href="promises.html"\2>Promises</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Timeline</a>', r'<a\1href="journey.html"\2>Timeline</a>', content)
    content = re.sub(r'<a([^>]*?)href="#"([^>]*?)>Letter</a>', r'<a\1href="letter.html"\2>Letter</a>', content)

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Patching complete 2.")
