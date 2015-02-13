#!/usr/bin/env perl 
#===============================================================================
#
#         FILE: parse_footnotes.pl
#
#        USAGE: ./parse_footnotes.pl  
#
#  DESCRIPTION: Markup markdown-style footnotes in HTML
#
#===============================================================================

use strict;
use warnings;
use utf8;
use feature 'say';
use FindBin;
use lib "$FindBin::Bin/../local/lib/perl5";
use IO::All;

# Get the file name 
my $file = shift @ARGV;

# Read it into $content
my $content < io $file;

# Find numerica markdown footnote [^1] references, replace with footnote style markup
$content =~ s!(\[)\^(\d+)(\])!<sup id="fnref:$2"><a href="#fn:$2" rel="footnote">$2</a></sup>!g;

# Write the file
$content > io($file);
