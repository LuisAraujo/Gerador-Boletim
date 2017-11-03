
$(document).ready(function(){
   console.log("ç");
	var jqxhr = $.post( "getDirs.php", {},function() {
	})
		.done(function(data){
			projectList = jQuery.parseJSON(data);

			if(projectList.length > 0){
				projectList.forEach(function(element, index){
					
					//remove dir/ and .csv of name of file
					nameFileSplit = element.split("//")[1].split(".")[0];
					nameFileSplit = nameFileSplit.replace(/_/g, ' ');
					bt =  "<li class='list-group-item'><span class='name-list-item'><b>"+nameFileSplit+"</b></span>";
					bt += "<a class='bt-gerate-notes btn btn-success btn-sm' href='#' role='button' dirfile='"+element+"'>";
					bt += "<span class='glyphicon  glyphicon-ok-sign' aria-hidden='true'></span> Gerar Boletim</span></a>"; 
					$("#list-class").append(bt);
					
					$(".bt-gerate-notes").click(function(){
						gerateBoletim( $(this).attr("dirfile") );
					});

				});
				
				//start(projectList);
			
			}else
				alert( "error get list file" );

		})
		.fail(function() {
			alert( "error get list file" );
		})
});


function gerateBoletim(data){
	
	disciplines = ["Português","Inglês",
	"Matemática","História","Ciência","Geografia",
	"Artes","Informática","Religião"];

    //for(var i =0; i< data.length; i++){

		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", data, false);
		var namefile = data;
		
		rawFile.onreadystatechange = (function ()
		{
			return function()
			{
				if(rawFile.readyState === 4)
				{
					if(rawFile.status === 200 || rawFile.status == 0)
					{       

						var allText = rawFile.responseText;
						//get line
						arrText = allText.split("\n");
						
						//all data in this format Student1:Discipline1-Note1-Note2-Note3 ...  DisciplineN-Note1-Note2-Note3_Student2
						all_data = "";
						
						//start form 7º line 'couse head elements in sheet
						for(var i= 7; i < arrText.length; i++)
						{
							//replace
							arrText[i] = arrText[i].replace(/(?:\r\n|\r|\n)/g, '');
							
							//if is not empyty
							if(arrText[i] != "")
							{

							   //separete by ; in csv format
							   arrTextSplit = arrText[i].split(";");
							   //is empyt?
							   if(arrTextSplit[1].length == 0)
								 continue;
							 
							   //if is not first time, set _ (separator)	 
							   if(all_data.length > 0)
								  all_data +="_";
								
								//name of student
								name_students = arrTextSplit[1];
								
								//array of disciplines in string
								arr_discipline = "";
								
								for(var j = 0; j<disciplines.length; j++){
									
									//if is not first time, set ; (separator)
									if(j != 0)  
										arr_discipline +=";"
									
									//name of discipline
									arr_discipline += disciplines[j]+"-";
									/*this notes of each disciplines is separet with 13 (amount disciplins)*/
									//note of I unit 
									arr_discipline += arrTextSplit[j+2]+"-";
									arr_discipline += arrTextSplit[j+9+2]+"-";
									
									//note of II unit 
									arr_discipline += arrTextSplit[j+(9*2)+2]+"-";
									arr_discipline += arrTextSplit[j+(9*3)+2]; //+"-";
								
									//note of III unity
									//arr_discipline += arrTextSplit[j+(9*4)+2]+"-";;
									//arr_discipline += arrTextSplit[j+(9*5)+2]+"-";;
								
								
								}
								
								//concating all data
								all_data += name_students+":"+arr_discipline;
							
								//remove dir/ and .csv of name of file
								nameFileSplit = namefile.split("//")[1].split(".")[0];
								
								//slpiting year, class and shift
								ano_turma_turno =  nameFileSplit.split("_");
								ano = ano_turma_turno[0]; 
								turma = ano_turma_turno[1];
								turno = ano_turma_turno[2];
								
							}
						}
						
						//call saveData function
						saveData(all_data, nameFileSplit,  ano, turma, turno);
						console.log(   all_data );
					}
				}
			
			}
		})(namefile);
		
		
		rawFile.send(null);
    //}

}


/*@function saveData
@abstract this funcition get datas about course, students e notes and send for input in html 
*/
function saveData(all_data, dirFile, ano, turma, turno){
    //set all data of studentes: name, notes in each disciplines
	$("#all_data").val(all_data);
	//dir file
	$("#cdir").val(dirFile);
	//shift of class
    $("#c_turno").val(turno);
    $("#c_turma").val(turma);
    $("#c_ano").val(ano);
	
	//submit with jsquery functions
    $('#formImportPdf').submit();
}

