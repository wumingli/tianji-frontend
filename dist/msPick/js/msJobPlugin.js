/* build at 2013-06-17 10:19:15 */
!function(a){a.fn.msJobPlugin=function(b){var c={type:"job",check:"checkbox",maxCount:5,column:6,comData:[],init:[],style:{foldHeadWidth:"78px",msCbComponent:"88px",msOkWidth:"150px"},align:"left"},d=a.extend(c,b),e="<div class='ms-btn-component ms-btn-canhover'></div><div class='txt-box-component'><input type='text' class='ms-txt-component' maxlengh='20' name='' value='' /></div><input type='hidden' class='ms_checkInput' value='' name='"+d.type+"Code' />";switch(a(this).append(a(e)),d.structure="",d.allData=[],d.listData=[],d.hotData=[],d.id="",d.type){case"job":d.id="msPickJob",d.structure="<div class='ms-pick' id='"+d.id+"' style='width:600px'>"+"<div class='w-h-tab-component'>"+"<ul class='h-tab clear'>"+"<li class='tab-menu-component'>职能选择</li>"+"</ul>"+"<a class='close-component' href='javascript:;'>删除</a>"+"</div>"+"<div class='c-tab'>"+"<div class='tab-con-component tab-con-width' style='width:583px'>"+"<div class='otherAll' style='height:300px; overflow-y:auto;'>"+"</div>"+"</div>"+"</div>"+"</div>",d.allData={nodes:[]},d.listData={nodes:[]};for(var f=0;f<jobData.job.length;f++)for(var g=0;g<jobData.job[f].nodes.length;g++)d.allData.nodes.push(jobData.job[f].nodes[g]);for(var f=0;f<d.allData.nodes.length;f++)for(var g=0;g<d.allData.nodes[f].nodes.length;g++)d.listData.nodes.push(d.allData.nodes[f].nodes[g])}a("body").append(a(d.structure)),d.createDom=function(){if(this.comData.nodes){for(var b="",c=0;c<this.comData.nodes.length;c++)b+="<label class='ms-cb-component' style='width:"+this.style.msCbComponent+"'><input type="+this.check+" name='"+this.type+"com' class='ms-cb-cb' value="+this.comData.nodes[c].code+" ms-cb-data="+this.comData.nodes[c].name+" />"+this.comData.nodes[c].name+"</label>";a("#"+this.id).find(".common").append(a(b))}if(this.hotData.nodes){for(var d="",c=0;c<this.hotData.nodes.length;c++)d+="<label class='ms-cb-component' style='width:"+this.style.msCbComponent+"'><input type="+this.check+" name='"+this.type+"hot'+ class='ms-cb-cb' value="+this.hotData.nodes[c].code+" ms-cb-data="+this.hotData.nodes[c].name+" />"+this.hotData.nodes[c].name+"</label>";a("#"+this.id).find(".hot-city").append(a(d))}for(var e=this.allData.nodes.length,f=Math.ceil(e/this.column),g="",c=0;f>c;c++)g+="<div class='foldable'><div class='fold-head-component'></div></div>";a("#"+this.id).find(".otherAll").append(a(g));for(var c=0;f>c;c++){for(var h="",i="",j=c*this.column;j<(c+1)*this.column&&e>j;j++)h+="<span order="+j+" style='width:"+this.style.foldHeadWidth+"'><label>"+this.allData.nodes[j].name+"</label></span>",i+="<div class='fold-con-component' order="+j+"></div>";a("#"+this.id).find(".foldable").eq(c).find(".fold-head-component").append(a(h)),a("#"+this.id).find(".foldable").eq(c).append(a(i))}for(var k=a("#"+this.id).find(".fold-con-component"),c=0;c<k.length;c++){for(var l="",j=0;j<this.allData.nodes[c].nodes.length;j++)l+="<label class='ms-cb-component' style='width:"+this.style.msCbComponent+"'><input type="+this.check+" class='ms-cb-cb' name="+this.type+" value="+this.allData.nodes[c].nodes[j].code+" ms-cb-data="+this.allData.nodes[c].nodes[j].name+" />"+this.allData.nodes[c].nodes[j].name+"</label>";k.eq(c).append(a(l))}var m=a("#"+this.id).find(".fold-head-component").find("span");m.on("click",function(){m.removeClass("active"),k.hide();var b=a(this).index();a(this).parent().find("span").removeClass("active"),a(this).addClass("active"),a(this).parent().parent().find(".fold-con-component").hide().eq(b).show()})},d.createDom();var h=function(){if(d.init.length>0){for(var a=[],b=0;b<d.init.length;b++)a.push(d.init[b].code);return a}return[]},i={index:0,keyArray:[13,38,40],selectLenght:0,aMsCb:[],msCheckInputArr:h(),max:5},j=a(this);return d.addDefault=function(){if(d.createDiv=a("#"+this.id),this.init.length>0){for(var b="",c=[],e=0;e<this.init.length;e++)b+="<a href='javascript:;' class='ms-selected-item' rel="+this.init[e].code+">"+"<span class='text'>"+this.init[e].name+"</span>"+"<span class='delete-component'>删除</span></a>",c.push(this.init[e].code);a(b).insertBefore(j.find(".ms-txt-component")),j.find(".ms_checkInput").val(c.join(",")),i.aMsCb=this.createDiv.find(".ms-cb-cb");for(var e=0;e<i.msCheckInputArr.length;e++)for(var f=0;f<i.aMsCb.length;f++)i.msCheckInputArr[e]==i.aMsCb[f].value&&(i.aMsCb[f].checked=!0)}},d.addDefault(),d.mpPosition=function(){var a=j.offset().left,b=j.find(".ms-txt-component").offset().top+25;switch(this.align){case"left":this.createDiv.css({left:a,top:b});break;case"right":a-=parseInt(this.createDiv.css("width"))-j.outerWidth()+2,this.createDiv.css({left:a,top:b})}},d.txt=function(){var b=this,c=j.find(".txt-box-component"),e=j.find(".ms-txt-component");c.on("click",function(){a(".ms-pick").hide(),d.createDiv.show(),d.mpPosition(),e.focus()}),e.on("keyup",function(c){for(var e=a(this).val(),g=[],h="",k="",l=j.find(".ms-ok-component"),m=j.find(".ms-error-component"),n="",o=!1,p=0;p<i.keyArray.length;p++)c.keyCode==i.keyArray[p]&&(o=!0);if(b.createDiv.hide(),!o){for(var p=0,q=b.listData.nodes.length;q>p;p++)b.listData.nodes[p].name.indexOf(e)>-1&&""!=e&&g.push(b.listData.nodes[p]);if(l&&l.remove(),m&&m.remove(),g.length>0){g.length>i.max&&(g.length=i.max);for(var p=0;p<g.length;p++)h+="<li rel="+g[p].code+"><a href='javascript:;'>"+g[p].name+"</a></li>";k="<div class='ms-ok-component' style='width:"+b.style.msOkWidth+"'>"+"<ul class='ms-list-component'>"+h+"</ul></div>"}0==g.length&&""!=e&&(k="<div class='ms-error-component'>您输入的信息不存在，请重新输入</div>"),j.append(a(k)),i.index=0,j.find("li").eq(i.index).addClass("active"),f()}var r=j.find("li");r.on("mouseover",function(){r.removeClass("active"),a(this).addClass("active"),i.index=a(this).index()});var s=function(c){var e=j.find(".ms-ok-component").find(".active").text(),f=j.find(".ms-ok-component").find(".active").attr("rel");if(n="<a href='javascript:;' class='ms-selected-item' rel="+f+">"+"<span class='text'>"+e+"</span>"+"<span class='delete-component'>删除</span></a>","radio"==b.check&&(j.find(".txt-box-component").find("a").remove(),j.find(".ms_checkInput").val(f)),"checkbox"==b.check){if(i.selectLenght=i.msCheckInputArr.length,i.selectLenght>=c)return j.find(".ms-txt-component").val(""),l&&l.remove(),alert("最多选择5项"),void 0;for(var g=j.find(".txt-box-component").find(".ms-selected-item"),h=!1,k=0;k<g.length;k++)g[k].getAttribute("rel")==f&&(h=!0);if(h)return j.find(".ms-txt-component").val(""),void 0;i.msCheckInputArr.push(f),j.find(".ms_checkInput").val(i.msCheckInputArr.join(","))}a(n).insertBefore(j.find(".ms-txt-component")),j.find(".ms-txt-component").val(""),i.aMsCb=b.createDiv.find(".ms-cb-cb"),i.aMsCb.each(function(){a(this).attr("value")==f&&a(this).attr("checked",!0)}),l&&l.remove(),d.mpPosition()};if(13==c.keyCode){if(0==r.length)return a(this).val(""),void 0;s(5)}switch(r.on("click",function(){s(5)}),c.keyCode){case 38:i.index--,-1==i.index&&(i.index=r.length-1),r.removeClass("active"),r.eq(i.index).addClass("active");break;case 40:i.index++,i.index==r.length&&(i.index=0),r.removeClass("active"),r.eq(i.index).addClass("active")}}),j.find(".ms-txt-component").on("keydown",function(c){var e=j.find(".txt-box-component").find(".ms-selected-item:last");if(8==c.keyCode&&""==a(this).val()){if("radio"==b.check&&(e.remove(),j.find(".ms-txt-component").val(""),j.find(".ms_checkInput").val(""),b.createDiv.find(".ms-cb-cb").attr("checked",!1)),"checkbox"==b.check){i.aMsCb=b.createDiv.find(".ms-cb-cb");for(var f=0;f<i.msCheckInputArr.length;f++)e.attr("rel")==i.msCheckInputArr[f]&&i.msCheckInputArr.pop();j.find(".ms_checkInput").val(i.msCheckInputArr.join(","));for(var f=0;f<i.aMsCb.length;f++)e.attr("rel")==i.aMsCb[f].value&&(i.aMsCb[f].checked=!1);e.remove()}d.mpPosition()}});var f=function(){var b=j.find(".ms-txt-component").position().left,c=j.find(".ms-txt-component").position().top+30;a(".ms-ok-component").css({left:b,top:c}),a(".ms-error-component").css({left:b,top:c})}},d.txt(),d.ckBox=function(){var c=this.createDiv.find(".h-tab").find(".tab-menu-component"),e=this.createDiv.find(".c-tab").find(".tab-con-component"),f=this.createDiv.find(".w-h-tab-component").find(".close-component"),g=[],h=this;c.length>=2&&c.on("click",function(){var b=a(this).index();switch(b){case 0:h.createDiv.css("width","400px");break;case 1:h.createDiv.css("width","570px")}a(this).parent().find("li").removeClass("active"),a(this).addClass("active"),e.hide(),e.eq(b).show()}),f.on("click",function(){h.createDiv.hide()}),i.aMsCb=this.createDiv.find(".ms-cb-cb");var k=this.createDiv.find(".ms-cb-component");k.on("change",function(){var c=a(this).find(".ms-cb-cb"),e=c.attr("ms-cb-data"),f=c.val(),k="<a href='javascript:;' class='ms-selected-item' rel="+f+">"+"<span class='text'>"+e+"</span>"+"<span class='delete-component'>删除</span></a>";if("radio"==h.check&&(j.find("a").remove(),a(k).insertBefore(j.find(".ms-txt-component")),j.find(".txt-box-component").val(f),j.find(".ms-txt-component").val(""),i.aMsCb=h.createDiv.find(".ms-cb-cb"),i.aMsCb.attr("checked",!1),i.aMsCb.each(function(){a(this).attr("value")==f&&a(this).attr("checked",!0)}),j.find(".ms_checkInput").val(f)),"checkbox"==h.check){selectCityLenght=i.msCheckInputArr.length;var l=function(){for(var a=[],b=0;b<i.msCheckInputArr.length;b++)c.val()!=i.msCheckInputArr[b]&&a.push(i.msCheckInputArr[b]);i.msCheckInputArr=a,j.find(".ms_checkInput").val(a.join(","))};if(selectCityLenght>=b.maxCount){if("checked"==c.attr("checked"))return a(this).find(".ms-cb-cb").attr("checked",!1),alert("最多选择5项"),void 0;l()}if(g=j.find(".ms-selected-item"),c.attr("checked")){for(var m=0;m<i.aMsCb.length;m++)c.val()==i.aMsCb[m].value&&(i.aMsCb[m].checked=!0);a(k).insertBefore(j.find(".ms-txt-component")),i.msCheckInputArr.push(f),j.find(".ms_checkInput").val(i.msCheckInputArr.join(","))}else{for(var m=0;m<i.aMsCb.length;m++)c.val()==i.aMsCb[m].value&&(i.aMsCb[m].checked=!1);g.each(function(){a(this).attr("rel")==c.attr("value")&&a(this).remove()}),l()}}j.find(".ms-ok-component")&&j.find(".ms-ok-component").remove(),d.mpPosition()})},d.ckBox(),a(document).click(function(){j.find(".ms-ok-component")&&j.find(".ms-ok-component").remove(),j.find(".ms-error-component")&&j.find(".ms-error-component").remove()}),d.removeA=function(){var b=[],c=this;j.find(".txt-box-component").on("click",".delete-component",function(){if("radio"==c.check&&(a(this).parent(".ms-selected-item").remove(),c.createDiv.find(".ms-cb-cb").attr("checked",!1),j.find(".ms_checkInput").val(""),d.mpPosition()),"checkbox"==c.check){if(c.createDiv.find(".ms-cb-cb").length>0){b=c.createDiv.find(".ms-cb-cb:checked");var e=a(this);b.each(function(){a(this).attr("value")==e.parent().attr("rel")&&a(this).attr("checked",!1)})}for(var f=[],g=0;g<i.msCheckInputArr.length;g++)a(this).parent().attr("rel")!=i.msCheckInputArr[g]&&f.push(i.msCheckInputArr[g]);return i.msCheckInputArr=f,j.find(".ms_checkInput").val(f.join(",")),a(this).parent(".ms-selected-item").remove(),d.mpPosition(),!1}})},d.removeA(),a(window).resize(function(){d.mpPosition()}),this}}(jQuery);