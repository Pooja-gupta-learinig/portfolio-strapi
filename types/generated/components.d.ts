import type { Schema, Struct } from '@strapi/strapi';

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    buttonText: Schema.Attribute.String & Schema.Attribute.Required;
    buttonUrl: Schema.Attribute.Text & Schema.Attribute.DefaultTo<'/about'>;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'ternary', 'outline']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_sections';
  info: {
    displayName: 'CTASection';
  };
  attributes: {
    CTAButton: Schema.Attribute.Component<'shared.button', false>;
    Message: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'featureItem';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.Text;
  };
}

export interface SharedFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_features_sections';
  info: {
    displayName: 'FeaturesSection';
  };
  attributes: {
    featureItems: Schema.Attribute.Component<'shared.feature-item', true>;
    SectionTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_sections';
  info: {
    displayName: 'HeroSection';
  };
  attributes: {
    heroButton: Schema.Attribute.Component<'shared.button', false>;
    heroImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    heroTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    displayName: 'testimonialItem';
  };
  attributes: {
    Avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Feedback: Schema.Attribute.RichText & Schema.Attribute.Required;
    Name: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'testimonials';
  };
  attributes: {
    testomonialItemsInfo: Schema.Attribute.Component<
      'shared.testimonial-item',
      true
    >;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.button': SharedButton;
      'shared.cta-section': SharedCtaSection;
      'shared.feature-item': SharedFeatureItem;
      'shared.features-section': SharedFeaturesSection;
      'shared.hero-section': SharedHeroSection;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.testimonial-item': SharedTestimonialItem;
      'shared.testimonials': SharedTestimonials;
    }
  }
}
