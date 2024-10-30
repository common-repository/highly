<?php
/*
   Plugin Name: Highly - Highlight And Share Social Media Plugin
   description: A social media share tooltip to boost interactions with your content and increase post shares.
   Version: 1.0.0
   Author: The Highly Analytics Team
   Author URI: https://profiles.wordpress.org/highlyanalytics/
   License: GPL2 
   */
function Highly_Tooltip_Enqueue()
{
    wp_enqueue_style(
        "tooltip_css",
        plugin_dir_url(__FILE__) . "css/tooltip.css"
    );
    wp_enqueue_script("tooltip", plugin_dir_url(__FILE__) . "js/init.js");
}

function Highly_Make_Script_Module($tag, $handle, $src)
{
    if ("tooltip" === $handle) {
        $tag = str_replace("src=", 'type="module" src=', $tag);
    }
    return $tag;
}

add_filter("script_loader_tag", "Highly_Make_Script_Module", 10, 3);

add_action("wp_head", "Highly_Tooltip_Enqueue");
