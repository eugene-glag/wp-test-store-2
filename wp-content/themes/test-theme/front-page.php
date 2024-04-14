<?php

/* Template Name: Home Page */

get_header();

$best_collection_slider = get_field('best_collection_slider');
$products = $best_collection_slider['products'];
?>

<main>
    <section class="section-best-collection">
        <div class="best-collection_header">
            <h2 class="best-collection_title"><?php echo $best_collection_slider['title']; ?></h2>
        </div>
        <div class="best-collection_slider swiper-slider">
            <div class="swiper-button swiper-button-prev"></div>
            <div class="swiper-wrapper">
                <?php
                foreach ($products as $post) {
                    setup_postdata($post);
                    $product_id = $post->ID;
                    $product = wc_get_product($product_id);
                    ?>
                    <div class="best-collection_slide swiper-slide">
                        <div class="best-collection_image-content">
                            <?php echo $product->get_image(); ?>
                        </div>
                        <div class="best-collection_text-content">
                            <a class="best-collection_product-link" href="<?php echo $product->get_permalink(); ?>">
                                <h2 class="best-collection_product-title"><?php echo $product->get_name(); ?></h2>
                            </a>
                            <p class="best-collection_product-price"><?php echo $product->get_price_html(); ?></p>
                            <?php woocommerce_template_loop_add_to_cart(array('product' => $product)); ?>
                        </div>
                    </div>
                    <?php
                }
                wp_reset_postdata();
                ?>
            </div>
            <div class="swiper-button swiper-button-next"></div>
        </div>
        <div class="best-collection_footer">
            <span class="best-collection_footer-text"><?php echo $best_collection_slider['text_under_section']; ?></span>
        </div>
    </section>
    <style>
        .best-collection_title {
            color: <?php echo $best_collection_slider['titlte_color']; ?>;
            background-color: <?php echo $best_collection_slider['title_background_color']; ?>;
        }

        .section-best-collection .swiper-button {
            color: <?php echo $best_collection_slider['slider_button_color']; ?>;
        }
    </style>
</main>

<?php get_footer('main'); ?>

