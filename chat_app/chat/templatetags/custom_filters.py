from django import template

register = template.Library()

@register.filter
def format_time(value):
    if value:
        return value.strftime("%H:%M")
    return ""

@register.filter
def format_date(value):
    return value.strftime("%B %d, %Y")
