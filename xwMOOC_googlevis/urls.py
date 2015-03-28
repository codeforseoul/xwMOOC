from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'hello.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r"^$", direct_to_template, {"template": "main.html"}),
#    url(r'^$', 'xwMOOC_googlevis.main.index'),
)
