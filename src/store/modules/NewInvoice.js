import axios from 'axios';
//import Vue from 'vue';

const backEndURL = "http://192.168.1.10";
const backEndPort = ":1235";

const state = {
    currentParent:{
        parentID: 0,
        firstName: '',
        lastName: '',
        email: '',
        address: "",
    },
    children:[],
    pastdueBalance:10.00,
    currentInvoice:{
        invoiceID: -1,
        invoiceDate: '2001-01-01',
        dueDate: '2001-01-02',
        invoiceBalance: 100.00,
        comments: 'invoice Comments',
        invoiceStatus:1,
        invoiceLines:[
            {
                invoiceLineID: 0,
                childID: 3,
                careTypeID: 1,
                careQuantity: 5,
                startDate: '2001-01-03',
                endDate: '2001-01-04',
                lineCost: 175.00,
                comments:'line comments',        
            },
            {
                invoiceLineID: 1,
                childID: 3,
                childFname: 3,
                careTypeID: 1,
                careQuantity: 4,
                startDate: '2001-01-05',
                endDate: '2001-01-06',
                lineCost: 140.00,
                comments:'line comments',        
            }
        ],
    },
    careTypeList:[],

};


const getters = {
    getInvoiceParentInfo: state => state.currentParent,
    getInvoice: state => state.currentInvoice,
    getPastDueBalance: state => state.pastdueBalance,
    getChildren: state => state.children,
    getCareTypes: state => state.careTypeList,
    getInvoiceLines: state=> state.currentInvoice.invoiceLines,
};


const actions = {
    initializeParent:({commit})=>{
        let blankParent = {
            parentID: 0,
            firstName: '',
            lastName: '',
            email: '',
            address: "",
        };
        commit('updateParentState', blankParent);
    },
    intializePDBalance:({commit})=>{
        let payload = {
            balanceDue: 0,
        }
        commit('updatePastDueBalance', payload);
    },
    initializeChildren:({commit})=>{
        let childObjArray = [
            {
                childID:3,
                lastName:'Capson',
                firstName:'Paul',
            }
        ]

        commit('updateChildrenList', childObjArray)


    },
    initializeCareTypeList: ({commit})=>{
        axios.get(backEndURL+backEndPort+"/getCareTypelist")
            .then(response=>{
                commit('updateCareTypeList', response.data);
            })
            .catch(error=>{console.log(error)});

    },
    updateParentInfo: ({ commit, dispatch }, parentID) => {
        
        let requestPayload = {
            'parentID': parentID
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: requestPayload,
            url: backEndURL+backEndPort+'/getParent',
          };
        axios(options)
        .then(response =>{
            //console.log(response.data[0]);
            commit('updateParentState', response.data[0]);

        })
        .catch(error=>{console.log(error)});
        if(parentID != 0){
            //this.updateChildren(parentID);
            dispatch('updateChildrenList', parentID);

        }
    },
    updateDisplayBalance: ({commit}, parentID)=>{
        let requestPayload = {
            'parentID': parentID
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: requestPayload,
            url: backEndURL+backEndPort+'/getParentBalance',
          };
        axios(options)
        .then(response =>{
            //console.log(response.data[0]);
            commit('updatePastDueBalance', response.data[0][0]);

        })
        .catch(error=>{
            console.log(error)
        }); 

    },
    updateChildrenList: ({ commit }, parentID) => {
        console.log(parentID);
        let requestPayload = {
            'parentID': 3//parentID
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: requestPayload,
            url: backEndURL+backEndPort+'/getChildrenNameByParentID',
          };
        axios(options)
        .then(response =>{
            //console.log(response.data[0]);
            commit('updateChildren', response.data);

        })
        .catch(error=>{console.log(error)});
        
    },
};

const mutations = {
    updateParentState:(state, payload) => {
        state.currentParent =payload;
    },
    updatePastDueBalance:(state, payload) =>{
        state.pastdueBalance = payload.balanceDue;
    },
    updateChildren:(state, payload) =>{
        state.children = payload;
    },
    updateCareTypeList:(state, payload)=>{
        state.careTypeList = payload;
    }

};



export default {
    state,
    getters,
    actions,
    mutations
}