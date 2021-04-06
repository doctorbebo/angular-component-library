import { moduleMetadata, storiesOf } from '@storybook/angular';
import { COMPONENT_SECTION_NAME, STORY_PARAMS } from '../../src/constants';
import { storyWrapper, UtilModule } from '../../src/utils';
import { SpacerModule } from '@pxblue/angular-components';
import { withA11y } from '@storybook/addon-a11y';
import { withAllVariants } from './with-all-variants.stories';

storiesOf(`${COMPONENT_SECTION_NAME}/Typography`, module)
    .addDecorator(
        moduleMetadata({
            imports: [SpacerModule, UtilModule],
        })
    )
    // @accessibility
    .addDecorator(withA11y)
    .addDecorator(storyWrapper())
    .addParameters({
        ...STORY_PARAMS,
        notes: {
            markdown: `
            # Typography
            This demo displays all Angular typography variants.  
            
            For more details, check out the official 
            [Angular](https://localmaterial.angular.io/guide/typography) 
            or 
            [PX Blue](https://pxblue.github.io/style/typography) typography docs.
        `,
        },
    })
    .add('with all variants', withAllVariants);
