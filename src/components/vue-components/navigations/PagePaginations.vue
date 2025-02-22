<template>
    <div v-if="count > 1" class="join grid grid-cols-2 w-72 mx-auto" >
        <button class="join-item btn btn-outline" :class="{'btn-disabled' : page === 1}" @click.once="prevPage">Previous page</button>
        <button class="join-item btn btn-outline" :class="{'btn-disabled' : page === count}" @click.once="nextPage">Next</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

let url : URL;
 const props =  defineProps({
        page: {type: [Number], default: null},
        count: {type: [Number], default: null}
    });

onMounted(()=>{
    url = new URL(window.location.href);
    console.log(props.count);
})

const prevPage = () => {
    url.searchParams.set('page', (props.page - 1).toString());
    window.location.assign(url);
}
const nextPage = () => {
    url.searchParams.set('page', (props.page + 1).toString());
    window.location.assign(url);
}
</script>