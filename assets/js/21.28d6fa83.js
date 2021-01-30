(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{395:function(t,e,r){"use strict";r.r(e);var a=r(42),s=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"further-examples"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#further-examples"}},[t._v("#")]),t._v(" Further Examples")]),t._v(" "),r("h2",{attrs:{id:"configure-store"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#configure-store"}},[t._v("#")]),t._v(" Configure Store")]),t._v(" "),r("p",[t._v("You might be used to a "),r("code",[t._v("configureStore")]),t._v(" function from libraries like "),r("code",[t._v("deox")]),t._v(". @react-nano/tsrux does not provide one for a good reason:\nThere are already projects out there providing these. Depending on your other libraries you might already have one.")]),t._v(" "),r("p",[t._v("Here are some references:")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://www.npmjs.com/package/@reduxjs/toolkit",target:"_blank",rel:"noopener noreferrer"}},[t._v("@reduxjs/toolkit"),r("OutboundLink")],1),t._v(" (formerly known as "),r("a",{attrs:{href:"https://www.npmjs.com/package/redux-starter-kit",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-starter-kit"),r("OutboundLink")],1),t._v(")")]),t._v(" "),r("li",[r("a",{attrs:{href:"https://www.npmjs.com/package/redux-dynamic-modules",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-dynamic-modules"),r("OutboundLink")],1),t._v(", an awesome library if you are planning to modularize your code.")])]),t._v(" "),r("h2",{attrs:{id:"combine-reducers"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#combine-reducers"}},[t._v("#")]),t._v(" Combine Reducers")]),t._v(" "),r("p",[t._v("@react-nano/tsrux is compatible with "),r("a",{attrs:{href:"https://redux.js.org/api/combinereducers",target:"_blank",rel:"noopener noreferrer"}},[t._v("combineReducers"),r("OutboundLink")],1),t._v(" from redux.")]),t._v(" "),r("h2",{attrs:{id:"create-store"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#create-store"}},[t._v("#")]),t._v(" Create Store")]),t._v(" "),r("p",[t._v("@react-nano/tsrux is compatible with "),r("a",{attrs:{href:"https://redux.js.org/api/createstore",target:"_blank",rel:"noopener noreferrer"}},[t._v("createStore"),r("OutboundLink")],1),t._v(" from redux.")]),t._v(" "),r("h2",{attrs:{id:"redux-saga"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#redux-saga"}},[t._v("#")]),t._v(" Redux Saga")]),t._v(" "),r("p",[t._v("@react-nano/tsrux is compatible with "),r("a",{attrs:{href:"https://redux-saga.js.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("redux-saga"),r("OutboundLink")],1),t._v(" and reduces boilerplate code here as well:")]),t._v(" "),r("div",{staticClass:"language-typescript extra-class"},[r("pre",{pre:!0,attrs:{class:"language-typescript"}},[r("code",[r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" ActionOf "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@react-nano/tsrux"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" addTodo "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./actions"')]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("todosSaga")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("yield")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("takeEvery")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("addTodo"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("type")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" addTodoSaga"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n\n"),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[t._v("addTodoSaga")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("action"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" ActionOf"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("typeof")]),t._v(" addTodo"),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//...")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),r("h2",{attrs:{id:"redux-thunk"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#redux-thunk"}},[t._v("#")]),t._v(" Redux Thunk")]),t._v(" "),r("p",[t._v("No special knowledge required to use redux thunk with @react-nano/tsrux.")])])}),[],!1,null,null,null);e.default=s.exports}}]);