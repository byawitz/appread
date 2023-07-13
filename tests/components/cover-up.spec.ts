import {mount} from "@vue/test-utils";
import {describe, expect, test} from "vitest";
import CoverUp from "@/components/CoverUp.vue";

describe('Checking CoverUp', () => {
    const wrapper = mount(CoverUp, {
        props: {
            show : false,
            title: 'Test Title'
        }
    })

    test('It\'s not visible when show is set to false', () => {
        expect(wrapper.find('h1').exists()).toBe(false);
    });

    test('It\'s visible when show is set to true', async () => {
        await wrapper.setProps({show: true});
        expect(wrapper.find('h1').text()).toEqual('Test Title')
    });
});
