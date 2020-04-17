# Формат данных о приеме

дата приема &nbsp;{  
&nbsp;&nbsp;attendanceDate: **Date**,  
&nbsp;&nbsp;patientName: **String**,  
&nbsp;&nbsp;medicName: **String**,  
&nbsp;&nbsp;firstStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **String||Number**}, ...],  
&nbsp;&nbsp;secondStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **String||Number**}, ...],  
&nbsp;&nbsp;thirdStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **String||Number**}, ...],  
&nbsp;&nbsp;fourthStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **String||Number**}, ...],  
&nbsp;&nbsp;fifthStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **String||Number**}, ...],  
&nbsp;&nbsp;patientDynamic: **String||Number**,  
&nbsp;&nbsp;beforeAttendance: {comments: **String**, pain: **Number**},  
&nbsp;&nbsp;afterAttendance: {comments: **String**, pain: **Number**}  
}  
  
После двоеточия идет тип данных значения этого ключа:  
- **String** - строка  
- **Date** - экземпляр класса new Date()  
- **Number** - целочисленное значение  
  
В тех местах, где стоит оператор 'или' - || - Значит, что форматов может быть несколько и необходимо решить, какой именно использовать (напр. String||Number - данные могут представлять из себя число или строку)
