<?php
    header('Content-Type:application/json; charset=utf-8');
    $arr = array(
        'status' => 'ok',
        'logo' => 'http://static.tianji.com/images/logos/user/medium_logo.png',
        'name' => '老鼠七'.rand(0,20),
        'v_level' => 1,
        'is_friend' => false,
        'verify' => false,
        'headline' => '拆迁办任打洞',
        'has_self_result' => true,
        'mettle_type' => 'ISFJ',
        'mettle_type_cn' => '保护者',
        'mettle_img' => '/images/ce/mini_profile_headers/isfj.png',
        'industry' => '高等教育',
        'city' => '莆田'
    );
    echo(json_encode($arr));
?>