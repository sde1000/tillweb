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
"""  # noqa: E501


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


_tab_template = """
<li class="nav-item">
<a class="{link_classes}" id="{id}Tab" href="#{id}" data-bs-toggle="tab" data-bs-target="#{id}" role="tab" aria-controls="{id}" aria-selected="{active}">{title}</a>
</li>
"""  # noqa: E501


@register.simple_tag
def tab(id, title="Tab", active=False):
    link_classes = set()
    link_classes.add("nav-link")
    if active:
        link_classes.add("active")
    format_kwargs = {
        "link_classes": " ".join(link_classes),
        "id": id,
        "title": title,
        "active": "true" if active else "false",
    }
    return format_html(_tab_template, **format_kwargs)


_tabcontent_template = """
<div class="{pane_classes}" id="{id}" aria-labelledby="{id}Tab" tabindex="0">{content}</div>
"""  # noqa: E501


@register.simple_block_tag
def tabcontent(content, id, active=False):
    pane_classes = set()
    pane_classes.add("tab-pane")
    pane_classes.add("fade")
    if active:
        pane_classes.add("show")
        pane_classes.add("active")
    format_kwargs = {
        "id": id,
        "content": mark_safe(content),
        "pane_classes": " ".join(pane_classes),
    }
    return format_html(_tabcontent_template, **format_kwargs)
