import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    options: {
        customProperties: true
    },
    treeShake: true,
    theme: {
        themes: {
            light: {
                primary: '#55B9CF',
                accent: '#FF463A',
                secondary: '#F0F0F0',
                'btn-text-transform': 'capitalize'
            }
        }
    }
});
