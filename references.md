---
layout: datatable
---

### Just the Facts

This data set was assembled to inform [Bottom Lines](http://bottomlines.tyeesolutions.org), a research project by the Tyee Solutions Society. For more details scroll down or click here.

#### References 

<table id="references" class="table table-striped table-bordered dataTable no-footer" cellspacing="0" width="100%" role="grid" aria-describedby="example_info" style="width: 100%;">
        <thead>
            <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Party</th>
                <th>Summary</th>
            </tr>
        </thead>
    <tbody>
{% for foot in site.data.footnotes %}
    {% if foot.Category != 'footnotes' %}
    <tr id="{{ foot.ID }}">
        <td>{{ foot.Date }}</td>
        <td>{{ foot.Category }}</td>
        <td>{{ foot.Type }}</td>
        <td>{{ foot.Party }}</td>
        <td>
            <strong>{{ foot.Headline }}</strong><br />
            {{ foot.Fulltext }}{% if foot.Source %} <a href="{{ foot.Source }}">(Visit source)</a>{% endif %}<br />
            {% if foot.Cost %}Approximate cost: {{ foot.Cost }}{% endif %}
            
        </td>
    </tr>
    {% endif %}
{% endfor %}
    </tbody>
</table>

#### Footnotes

<table id="footnotes" class="table table-striped table-bordered dataTable no-footer" cellspacing="0" width="100%" role="grid" aria-describedby="example_info" style="width: 100%;">
        <thead>
            <tr>
                <th>Footnotes</th>
            </tr>
        </thead>
    <tbody>
{% for foot in site.data.footnotes %}
    {% if foot.Category == 'footnotes' %}
    <tr id="{{ foot.ID }}">
        <td>
            {{ foot.Fulltext }} <a href="{{ foot.Source }}">(Visit source)</a>
        </td>
    </tr>
    {% endif %}
{% endfor %}
    </tbody>
</table>

#### Methods 

This information was assembled and reported with strict, non-partisan neutrality. Individual records are accurate as far as we were able to determine from available sources—some, but not all of which are online (links provided where possible). However we cannot guarantee the perfect accuracy of all the contents; please don’t rely exclusively on this record. We also welcome corrections at TK. 

The underlying research and data collection for this project was done by Tyee Solutions Society in collaboration with the University of Victoria Environmental Law Centre and Tides Canada Initiatives, with the intent of making it freely available to any individual or organization who might find it useful.

If you would like to contribute to maintaining and expanding this database, please let us know TK. 
