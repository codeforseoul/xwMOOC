from django.shortcuts import render_to_response
import json

def index(request):
    data = [
          ['Country', 'Popularity'],
          ['Germany', 200],
          ['United States', 300],
          ['Brazil', 400],
          ['Canada', 500],
          ['France', 600],
          ['RU', 200]
        ];
    js_data = json.dumps(data)
    return render_to_response('main.html', {"data": js_data})
