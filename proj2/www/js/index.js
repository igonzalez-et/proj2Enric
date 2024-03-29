/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

let storageTasks = JSON.parse(localStorage.getItem("tasks"));
if(storageTasks == null){
    storageTasks = [];
}
else{
    for (let i = 0; i < storageTasks.length; i++) {
        var elem = $("ul").append("<li><a href='#page1'>"+storageTasks[i]+"<button class='buttonEliminar' data-role='none'>Eliminar</button></a></li>");
    }
    $("#homePage").ready(function(){
        $("a", elem).click(editar);
        $("ul").listview( "refresh" );
        $('ul li a button').click(function(e){
            var tar = e.target || e.srcElement;
            let textoListView = $(tar.parentElement).text();
            for (let i = 0; i < storageTasks.length; i++) {
                if(textoListView == storageTasks[i]+"Eliminar"){
                    storageTasks.splice(i,1);
                    localStorage.setItem("tasks", JSON.stringify(storageTasks));
                }
            }
            $(tar.parentElement).remove();
            return false;
        });
    });
    
}

$("#afegir").click(function() {
    let pro = prompt("Escribe el nombre de la tarea que quieres añadir:");
    var elem = $("ul").append("<li><a href='#page1'>"+pro+"<button class='buttonEliminar'>Eliminar</button></a></li>");
    $("a", elem).click(editar);
    $("ul").listview( "refresh" );
    $('ul li a button').click(function(e){
        var tar = e.target || e.srcElement;
        let textoListView = $(tar.parentElement).text();
        for (let i = 0; i < storageTasks.length; i++) {
            if(textoListView == storageTasks[i]+"Eliminar"){
                storageTasks.splice(i,1);
                localStorage.setItem("tasks", JSON.stringify(storageTasks));
            }
        }
        $(tar.parentElement).remove();
        return false;
    });
    storageTasks.push(pro);
    localStorage.setItem("tasks", JSON.stringify(storageTasks));
});

var targetElem = null;

function editar(e){
    var tar = e.target || e.srcElement;
    targetElem = tar;

}

$("#guardaButton").click(guardar);
function guardar(){
    var editTaskList = $("#editName").val();

    let textoListView = $(targetElem.parentElement).text();
    for (let i = 0; i < storageTasks.length; i++) {
        if(textoListView == storageTasks[i]+"Eliminar"){
            storageTasks[i] = editTaskList;
            localStorage.setItem("tasks", JSON.stringify(storageTasks));
        }
    }

    botoStr = "<button class='buttonEliminar'>Eliminar</button>";
    $(targetElem).html(editTaskList+botoStr);
    $('ul li button').click(function(e){
        var tar = e.target || e.srcElement;
        $(tar.parentElement).remove();
        return false;
    });
}

