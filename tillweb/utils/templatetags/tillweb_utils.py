from django import template
from django.utils.html import format_html
from django.utils.safestring import mark_safe

register = template.Library()

_modal_template = """
<div class="{mod_classes}" id="{id}"{static} tabindex="-1" aria-labelledby="{idLabel}" aria-hidden="true">
<div class="{dia_classes}">
<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title fs-5" id="{idLabel}">{title}</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
{content}
</div>
</div>
</div>
"""

@register.simple_block_tag
def modal(content, id, dialog_class="",
          title="Title", static=False, fade=True):
    mod_classes = set()
    dia_classes = set(dialog_class.split())
    mod_classes.add("modal")
    if fade:
        mod_classes.add("fade")
    dia_classes.add("modal-dialog")
    format_kwargs = {
        "mod_classes": " ".join(mod_classes),
        "dia_classes": " ".join(dia_classes),
        "static": mark_safe(
            ' data-bs-backdrop="static" data-bs-keyboard="false"')
        if static else '',
        "id": id,
        "idLabel": f"{id}Label",
        "title": title,
        "content": mark_safe(content),
    }
    return format_html(_modal_template, **format_kwargs)
