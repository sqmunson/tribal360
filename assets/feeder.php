<?php

$uri = str_replace(' ', '%20', $_GET["feed"]);

$xml = simplexml_load_string(file_get_contents($uri));



$writer = new XMLWriter();
$writer->openMemory();
$writer->setIndent(true);
$writer->setIndentString("	");
$writer->startDocument("1.0", "UTF-8");

$writer->startElement('rss'); // root
$writer->writeAttribute('version', '2.0');
$writer->writeAttribute('xmlns:media', 'http://search.yahoo.com/mrss/');
//$writer->writeAttribute('xmlns:mypod', 'http://buzz60.com/');

	$writer->startElement('channel'); // channel

		$writer->startElement('title');
			$writer->text($xml->channel->title);
		$writer->endElement(); // title
		$writer->startElement('description');
			$writer->text($xml->channel->description);
		$writer->endElement(); // description
		$writer->startElement('link');
			$writer->text($xml->channel->link);
		$writer->endElement(); // link

		$id = 0;

		foreach ($xml->channel->item as $item) {
			if($item->children('http://search.yahoo.com/mrss/')->thumbnail[0]->attributes()->url == '') {
				continue;
			}
			$writer->startElement('item');
				$writer->startElement('id');
					$writer->text($id);
				$writer->endElement();
				$writer->startElement('title');
					if($item->title) {
						$writer->text($item->title);
					}
				$writer->endElement();
				$writer->startElement('description');
					$writer->text($item->description);
				$writer->endElement();
				$writer->startElement('file');
					$writer->text($item->children('http://search.yahoo.com/mrss/')->content->attributes()->url);
				$writer->endElement();
				$writer->startElement('thumbnail');
					$writer->text($item->children('http://search.yahoo.com/mrss/')->thumbnail[0]->attributes()->url);
				$writer->endElement();
				$writer->startElement('poster');
				if(isset($item->children('http://search.yahoo.com/mrss/')->thumbnail[1])) {
					$writer->text($item->children('http://search.yahoo.com/mrss/')->thumbnail[1]->attributes()->url);
				} else {
					$writer->text($item->children('http://search.yahoo.com/mrss/')->thumbnail[0]->attributes()->url);
				}
				$writer->endElement();
			$writer->endElement();
			$id++;
		}

	$writer->endElement(); // channel
$writer->endDocument(); // root


class XmlToJson {

	public function Parse ($url) {

		$fileContents = str_replace(array("\n", "\r", "\t"), '', $url);

		$fileContents = trim(str_replace('"', "'", $fileContents));

		$simpleXml = simplexml_load_string($fileContents);

		$json = json_encode($simpleXml);

		return $json;

	}

}



header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
echo XmlToJson::Parse($writer->outputMemory());

