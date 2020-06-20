import axios from 'axios';
import Vue from 'vue';
const state = {
    parents:[],
    
};

const getters = {
    allParents: state => state.parents
};

const actions = {
    initializeParents: ({ commit })=>{
        axios.get('http://192.168.1.10:1235/parentList')
            .then(resData =>{  
                state.parents = resData.data;
                state.parents.forEach((parent,index) => {
                    commit('updateSelection', {index, selection:false});
            })
            
    })
        
    },
    selectParent: ({commit}, parentID)=>{
        parentID = parseInt(parentID);
        state.parents.forEach((parent,index)=>{
            if(parent.parentID === parentID){
                commit('updateSelection', {index, selection:true});
                
            } else {
                commit('updateSelection', {index, selection:false});
                
            }
        })
        commit
    },
    
};

const mutations = {
    updateSelection: (state, payload) =>{
        Vue.set(state.parents[payload.index], 'selected', payload.selection );
    }

};


export default {
    state,
    getters,
    actions,
    mutations
}