---
layout: datatable
---

#### Some heading

##### Some sub-heading

This data set was assembled to inform the writing of Bottom Lines [LINK], a research project by the Tyee Solutions Society. It is made available here for the interest and utility of other researchers.

This data set contains six collections, organized chronologically, of events recorded from 1989 to 2014 that had a bearing on or reflected Canada’s stewardship of national security: the country’s living, diverse and resilient ecosystems, and the high quality of air and water on which they depend. 

This information was assembled and reported with strict, non-partisan neutrality. Individual records are accurate as far as we were able to determine from sources—some, but not all of which are online (links provided). However no warranty is offered for the perfect accuracy of the contents. We welcome corrections; meanwhile users are cautioned from relying on these records exclusively.

The underlying research and data collection for this project was done by Tyee Solutions Society in collaboration with the University of Victoria Environmental Law Centre and Tides Canada Initiatives, with the intent of making it freely available to any individual or organization who might find it useful.  

If you would like to contribute to maintaining and expanding this database, please contact [Michelle Hoar] [LINK]


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
            {{ foot.Fulltext }}<br />
            {% if foot.Cost %}Approximate cost: {{ foot.Cost }} {% endif %}
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
            {{ foot.Fulltext }} <a href="{{ foot.Source }}">Source</a>
        </td>
    </tr>
    {% endif %}
{% endfor %}
    </tbody>
</table>

The data are organized into the following sections:


* Peers: Including Canada’s standing on the environment internationally, significant actions taken by Canada’s peers to protect the environment and major international treaties.

* Economy: Including the cost of major environmental events and estimates of the value to Canada’s economy of existing ecosystems.

* Land, Air and Water: Including legislation to protect these environmental basics, independent assessments of the implementation and effectiveness of those measures, and significant related court decisions.

* Species: Including legislation to protect individual species and ecosystems, independent assessments of the implementation and effectiveness of those measures, and significant related court decisions.

* Climate: Including both international assessments of the state of the global climate, the effects of climate change in Canada, national policy responses, as well as climate-related events and economic impacts.

* Awareness: Including Canada’s support for natural science, the monitoring of natural security, and legislation designed to anticipate and prevent environmental harms from development.

* (Footnotes: Support references in Bottom Lines not otherwise included in chronologies.)

The data can be searched by keyword or the following tags (case sensitive):

* DIPLOMACY
* LITIGATION
* SCIENCE
* LEGISLATION
* ASSESSMENTS
* EVENTS
* VALUATIONS
* PC (Progressive Conservative)
* LIB (Liberal Party of Canada)
* CPC (Conservative Party of Canada)
