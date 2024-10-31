<?php
/*
Ontos Feeder, provides data semantically relevant to the text being edited.
Copyright 2010 Ontos AG

This file is part of Ontos Feeder.

Ontos Feeder is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Ontos Feeder is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with Ontos Feeder.  If not, see <http://www.gnu.org/licenses/>.
*/
 

function _ontosFeeder_addRdfaDoctype($buffer)
{
  static $mimetypes = array('text/html');
  static $doctype   = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML+RDFa 1.0//EN\"\n  \"http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd\">\n";
  // Only attempt RDFa modifications for HTML output:
  if (in_array($mimetype = _ontosFeeder_getContentType(), $mimetypes)) {
    $buffer = _ontosFeeder_removeDocType($buffer, $doctype);
    $buffer = _ontosFeeder_insertNamespaces($buffer);
    $buffer = $doctype . $buffer;
  }
  return $buffer;
}

function _ontosFeeder_getContentType($default = NULL) {
  static $regex = '!^Content-Type:\s*([\w\d\/\-]+)!i';
  return _ontosFeeder_getHttpHeader($regex, $default);
}

function _ontosFeeder_getHttpHeader($regex, $default = NULL) {
  // The last header is the one that counts:
  //$headers = preg_grep($regex, explode("\n", drupal_get_headers()));
  $headers = preg_grep($regex, headers_list());
  if (!empty($headers) && preg_match($regex, array_pop($headers), $matches)) {
    return $matches[1]; // found it
  }
  return $default; // no such luck
}

function _ontosFeeder_removeDocType($buffer, &$doctype) {
  $lines = $cutoff = 0;
  $line  = strtok($buffer, "\n");

  // Attempt to find the opening <html> tag in the first 15 lines:
  while ($line !== FALSE && $lines++ < 15) {
    if (($pos = strpos($line, '<html')) !== FALSE) {
      // If we managed to find <html>, substitute the DOCTYPE; otherwise, the
      // page output will be returned unmodified.
      return substr($buffer, $cutoff += $pos);
    }

    $cutoff += strlen($line) + 1; // line length and "\n"
    $line = strtok("\n");
  }

  $doctype = ''; // Don't prepend the new doctype
  return $buffer;
}

function _ontosFeeder_insertNamespaces($buffer) {
  $namespaces = _ontosFeeder_getNamespaces('rdfa');

  // Attempt to find the last character of the opening <html> tag:
  if (!empty($namespaces) && ($html = strtok($buffer, '>'))) {
    $buffer = substr($buffer, strlen($html) + 1);

    // Insert the xmlns:prefix="uri" definitions at the end of the opening <html> tag:
    $xmlns  = array();
    foreach ($namespaces as $prefix => $uri) {
      $xmlns[] = '      xmlns:' . $prefix . '="' . $uri . '"';
    }
    $html  .= "\n" . implode("\n", $xmlns) . '>';
    return $html . $buffer;
  }
  return $buffer;
}

function _ontosFeeder_getNamespaces($op = NULL) {
  global $rdf_namespaces;
  if (empty($rdf_namespaces)) {
    $rdf_namespaces = _ontosFeeder_createNamespaces('rdf_namespaces');
    ksort($rdf_namespaces);
  }

  switch ($op) {
    case 'rdfa': // only RDFa-enabled namespaces
      $defaults = array('rdf', 'dc', 'foaf','ontosid','sofa','ontosci');
      $defaults = array_combine($defaults, $defaults);
      return array_intersect_key($rdf_namespaces, $defaults);
    default:     // all namespaces
      return $rdf_namespaces;
  }
}

/**
 * Implementation of hook_rdf_namespaces().
 */
function _ontosFeeder_createNamespaces() {
  $namespaces = array(
    '_'        => 'http://bnode.net/',
    'rdf'      => 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    'rdfs'     => 'http://www.w3.org/2000/01/rdf-schema#',
    'xsi'      => 'http://www.w3.org/2001/XMLSchema-instance#',
    'xsd'      => 'http://www.w3.org/2001/XMLSchema#',
    'owl'      => 'http://www.w3.org/2002/07/owl#',
    'dc'       => 'http://purl.org/dc/elements/1.1/',
    'dcterms'  => 'http://purl.org/dc/terms/',
    'dcmitype' => 'http://purl.org/dc/dcmitype/',
    'foaf'     => 'http://xmlns.com/foaf/0.1/',
 	'ontosid'  => 'http://www.ontosearch.com/2008/01/identification#',
    'sofa'     => 'http://sofa.semanticweb.org/sofa/v1.0/system#',
    'ontosci'  => 'http://www.ontosearch.com/2008/02/ontosminer-ns/domain/common/english#',
    'annotea'  => 'http://www.ontosearch.com/2007/12/annotation-ns#'
  );
//  foreach (rdf_schema_get_entities() as $entity) {
//    $namespaces[$entity] = RDF_SCHEMA_URI . $entity .'#';
//  }
//  return array_merge($namespaces, rdf_db_rdf_namespaces());
return $namespaces;
} 
?>