=== Ontos Feeder ===
Contributors: alex.klebeck@ontos.com
Donate link: http://www.ontos.com
Tags: NLP, Semantics, Metadata, Microformats, RDFa, Recommendations, Linked Data
Requires at least: 2.9.2
Tested up to: 3.0.4
Stable tag: 1.1

Ontos Feeder automatically analyzes the content of your article and provides additional relevant information for the main topics.

== Description ==

Ontos Feeder automatically analyzes the content of your article and provides additional information for the main topics. In addition it allows to automatically create and embed relevant metadata into your published text. Currently supported formats are RDFa and Microformats.

Ontos Feeder uses Ontos' Web Service in order to process your text with cutting-edge NLP technology, and the [Ontos News Portal](http://news.ontos.com) as one of the sources for additional relevant information. In order to be able to use the plug-in, you have to subscribe for an account at [Ontos](http://www.ontos.com), tab 'Semantic API'.

After successful installation you see a button 'Get tags!' in your WYSIWYG editor. Write some text and press this button. Ontos Feeder will automatically find the main topics of your article, mark them in the text and provide additinal information in the separate Ontos Feeder frame. Check these information by clicking on the marked text or an entry in the Ontos Feeder frame. If you asked for automatically creating RDFa or Microformats for your content, you may delete the marks that you don't want to appear in your published article directly in the editor.

== Installation ==

1. Copy the directory 'ontosFeeder' to the '/wp-content/plug-ins/' directory of your WordPress installation.
1. Activate the plug-in through the 'Plugins' menu in WordPress
1. Apply for an API account at [Ontos](http://www.ontos.com/o_eng/index.php?cs=2-3 "Semantic API"). You will receive an e-mail with your personal user name and password.
1. Select 'Ontos Feeder' in the 'Settings' menu in WordPress. 
1.1 Enter your user name and password,
1.1 Select what kind of metadata you want to automatically get injected into your content,
1.1 Select what kind of objects you are interested in,
1.1 Save your settings.

== Screenshots ==

1. Ontos Feeder information frame.
2. Markup by Ontos Feeder.

== Changelog ==

= 1.1 =
* Path problems resolved.

= 1.0 =
* Initial version.