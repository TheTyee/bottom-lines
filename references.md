---
layout: datatable
---

### Just the Facts

This data set was assembled to inform [Bottom Lines](http://bottomlines.tyeesolutions.org), a research project by the Tyee Solutions Society. <span class="hidden-xs hidden-sm">For more details scroll down or [click here](/references/#methods).</span>

<div  class="visible-xs">
    <br />
    <p class="alert alert-warning" role="alert">This content is only avaialble from your tablet, laptop, or desktop device.</p>
</div>

<div class="hidden-xs">

<h4>References</h4>

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

<h4>Footnotes</h4>

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

<h4>Legend</h4>

<p>The data are organized chronologically into the following sections:</p>
  
<p><strong>Peers</strong>: Including Canada’s standing on the environment internationally, significant actions taken by Canada’s peers to protect the environment and major international treaties.
</p>
<p>
<strong>Economy</strong>: Including the cost of major environmental events and estimates of the value to Canada’s economy of existing ecosystems.
</p>
<p>
<strong>Land, Air and Water</strong>: Including legislation to protect these environmental basics, independent assessments of the implementation and effectiveness of those measures, and significant related court decisions.
</p>
<p>
<strong>Species</strong>: Including legislation to protect individual species and ecosystems, independent assessments of the implementation and effectiveness of those measures, and significant related court decisions.
</p>
<p>
<strong>Climate</strong>: Including both international assessments of the state of the global climate, the effects of climate change in Canada, national policy responses, as well as climate-related events and economic impacts.
</p>
<p>
<strong>Awareness</strong>: Including Canada’s support for natural science, the monitoring of natural security, and legislation designed to anticipate and prevent environmental harms from development.
</p>
<p>
(<strong>Footnotes</strong>: Support references in Bottom Lines not otherwise included in chronologies.)
</p>
<p>
The data can be searched by keyword or the following tags:
</p>
<p>
<ul>
    <li>Diplomacy</li>
    <li>Litigation</li>
    <li>Science</li>
    <li>Legislation</li>
    <li>Assessments</li>
    <li>Events</li>
    <li>Valuations</li>
    <li>Progressive Conservative (PC)</li>
    <li>Liberal Party of Canada (Lib)</li>
    <li>Conservative Party of Canada (CPC)</li>
</ul>
</p>
</div>
         
#### Methods 

This information was assembled and reported with strict, non-partisan neutrality. Individual records are accurate as far as we were able to determine from available sources—some, but not all of which are online (links provided where possible). However we cannot guarantee the perfect accuracy of all the contents; please don’t rely exclusively on this record. [We also welcome corrections](http://www.google.com/recaptcha/mailhide/d?k=01buOlX5MUmv64VTyP_gZIRQ==&c=VSBhM_2a-4AF8i4r0JbIJ2HGJMEbzXyix7iTml6KnII=).

The underlying research and data collection for this project was done by Tyee Solutions Society in collaboration with the University of Victoria Environmental Law Centre and Tides Canada Initiatives, with the intent of making it freely available to any individual or organization who might find it useful.

If you would like to contribute to maintaining and expanding this database, [please let us know](http://www.google.com/recaptcha/mailhide/d?k=01buOlX5MUmv64VTyP_gZIRQ==&c=VSBhM_2a-4AF8i4r0JbIJ2HGJMEbzXyix7iTml6KnII=).
