#!/usr/bin/env perl 
#===============================================================================
#
#         FILE: build_footnote_include.pl
#
#        USAGE: ./build_footnote_include.pl
#
#  DESCRIPTION: Read in a data file, output a footnote include file
#===============================================================================

use strict;
use warnings;
use utf8;
use feature 'say';
use FindBin;
use lib "$FindBin::Bin/../local/lib/perl5";
use IO::All;
use Text::CSV;
use Data::Dumper;

my $footnotes_data = shift @ARGV;
my $footnotes_include = shift @ARGV;

my $csv = Text::CSV->new( { binary => 1 } )    # should set binary attribute.
    or die "Cannot use CSV: " . Text::CSV->error_diag();

open my $io, "<:encoding(utf8)", $footnotes_data or die "csv: $!";
$csv->column_names( $csv->getline( $io ) );
my $rows = $csv->getline_hr_all( $io );
$csv->eof or $csv->error_diag();
close $io;

my $html = <<'END';
<div class="footnotes">
    <ol>
END

for my $ref ( @$rows ) {
    next unless $ref->{'ID'} && $ref->{'Fulltext'};
    my $id   = $ref->{'ID'};
    my $text = $ref->{'Fulltext'};
    my $source = $ref->{'Source'};
    if ( $source ) {
    $html .= <<"END_MSG";
        <li class="footnote" id="fn:$id">
            <p>$text (<a href="$source">Visit source</a>)<a href="#fnref:$id" title="return to article"> ↩</a><p>
        </li>
END_MSG
    } else {
    $html .= <<"END_MSG";
        <li class="footnote" id="fn:$id">
            <p>$text <a href="#fnref:$id" title="return to article"> ↩</a><p>
        </li>
END_MSG
    }
}

$html .= <<'END';
    </ol>
</div>
END

$html > io($footnotes_include);

__END__
<div class="footnotes">
    <ol>
        <li class="footnote" id="fn:2">
            <p>footnote 2.<a href="#fnref:2" title="return to article"> ↩</a><p>
        </li>
    </ol>
</div>
