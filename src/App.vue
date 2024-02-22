<template>
  <div class='demo-app'>
     <div v-if="isLoading" class="loader">LOADING</div>
     <div v-else>
       <div class='search-container'>
         <input type="date" v-model="searchDate" @change="highlightDate" placeholder="Search by date..." class="input"/>
       </div>
       <div class='demo-app-main'>
         <FullCalendar ref="fullCalendarRef" :options="calendarOptions" />
       </div>
     </div>
   </div>
</template>
 
 <script setup>
 import { onMounted, ref, watch } from 'vue';
 import FullCalendar from '@fullcalendar/vue3';
 import dayGridPlugin from '@fullcalendar/daygrid';
 import timeGridPlugin from '@fullcalendar/timegrid';
 import interactionPlugin from '@fullcalendar/interaction';
 import { INITIAL_EVENTS, createEventId } from './event-utils';
 
 const fullCalendarRef = ref(null);
 const searchDate = ref('');
 const isLoading = ref(true);
 const calendarOptions = {
   plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
   initialView: 'dayGridMonth',
   headerToolbar: {
     left: 'prev',
     center: 'title',
     right: 'next,today'
   },
   aspectRatio: 2.30,
   editable: true,
   dayMaxEvents: true,
   selectable: true,
   eventColor: 'red',
   selectMirror: true,
   dayMaxEvents: true,
   weekends: true,
   events: INITIAL_EVENTS,
   select: handleDateSelect,
   eventClick: handleEventClick,
 };
 
 onMounted(()=>{
  setTimeout(() => {
    isLoading.value = false;
  }, 6000);
 })

 function handleDateSelect(selectInfo) {
   const title = prompt('Please enter a new title for your event');
   if (title) {
     const calendarApi = selectInfo.view.calendar;
     calendarApi.addEvent({
       id: createEventId(),
       title,
       start: selectInfo.startStr,
       end: selectInfo.endStr,
       allDay: selectInfo.allDay
     });
   }
 }
 function handleEventClick(clickInfo) {
   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'?`)) {
     clickInfo.event.remove();
   }
 }
 watch(searchDate, () => {
   highlightDate();
 });
 function highlightDate() {
   const calendarApi = fullCalendarRef.value.getApi();
   if (searchDate.value) {
     calendarApi.gotoDate(searchDate.value);
     const backgroundEvents = calendarApi.getEvents().filter(event => event.groupId === 'backgroundHighlight');
     backgroundEvents.forEach(event => event.remove());
     calendarApi.addEvent({
       start: searchDate.value,
       end: searchDate.value,
       display: 'background',
       color: 'cyan',
       groupId: 'backgroundHighlight',
     });
   }
 }
 </script>
 <style scoped>
 .loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-right-color: black;
  animation: spin 1s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
 h2 {
   margin: 0;
   font-size: 16px;
 }
 ul {
   margin: 0;
   padding: 0 0 0 1.5em;
 }
 li {
   margin: 1.5em 0;
   padding: 0;
 }
 b { 
   margin-right: 3px;
 }
 .demo-app {
   display: flex;
   flex-direction: column;
   min-height: 100%;
   font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
   font-size: 14px;
 }
 .demo-app-sidebar {
   width: 300px;
   line-height: 1.5;
   background: #eaf9ff;
   border-right: 1px solid #d3e2e8;
 }
 .demo-app-sidebar-section {
   padding: 2em;
 }
 .demo-app-main {
   flex-grow: 1;
   padding: 3em;
 }
 .fc { 
   max-width: 1100px;
   margin: 0 auto;
 }
 .search-container{
   margin-top: 20px;
   width:100vw;
   height:50px;
 }
 .input{
   margin-left: 200px;
   width:250px;
   height:35px;
   padding-left: 6px;
 }
 
 </style>