<?php
/**
 * Plugin Name: Highly - Highlight And Share Social Media Plugin
 * description: A social media share tooltip to boost interactions with your content and increase post shares.
 * Version: 1.0.2
 * Author: HighlyAnalytics
 * Author URI: https://profiles.wordpress.org/highlyanalytics/
 * License: GPL2
 * Text Domain: highly
 *
 * @package Highy
 */

// Prevent direct calls.
if ( ! function_exists( 'add_action' ) ) {
	echo 'Cannot Call Plugin Directly';
	exit;
}

/**
 * Sets the script type for highly-tooltip to be a module
 *
 * @param tag    $tag    Script src location.
 * @param handle $handle WordPress name for script.
 */
function highly_make_script_module( $tag, $handle ) {
	if ( 'highly-tooltip' === $handle ) {
		$tag = str_replace( 'src=', 'type=module src=', $tag );
	}
	return $tag;
}

add_filter( 'script_loader_tag', 'highly_make_script_module', 10, 3 );

/**
 * Action to register and load both the stylesheet and the javascript
 */
function highly_tooltip_enqueue() {
	wp_enqueue_style(
		'highly-tooltip-css',
		plugins_url( 'dist/css/highly-tooltip.css', __FILE__ ),
		array(),
		'04262021'
	);
	wp_enqueue_script(
		'highly-tooltip',
		plugins_url( 'dist/js/highly-tooltip.js', __FILE__ ),
		array(),
		'04262021',
		false
	);
}

add_action( 'wp_enqueue_scripts', 'highly_tooltip_enqueue' );
