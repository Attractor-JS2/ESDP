# Формат данных о приеме

дата приема &nbsp;{  
&nbsp;&nbsp;attendanceDate: **Date**,  
&nbsp;&nbsp;patientName: **String**,  
&nbsp;&nbsp;medicName: **String**,  
&nbsp;&nbsp;firstStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **Number**, procedureIsNew: **Boolean**}, ...],  
&nbsp;&nbsp;secondStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **Number**, procedureIsNew: **Boolean**}, ...],  
&nbsp;&nbsp;thirdStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **Number**, procedureIsNew: **Boolean**}, ...],  
&nbsp;&nbsp;fourthStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **Number**, procedureIsNew: **Boolean**}, ...],  
&nbsp;&nbsp;fifthStage: [{procedureName: **String**, procedureArea: **String**, procedureDynamic: **Number**, procedureIsNew: **Boolean**}, ...],   
&nbsp;&nbsp;patientDynamic: **Number**,  
&nbsp;&nbsp;beforeAttendance: {comments: **String**, pain: **Number**},  
&nbsp;&nbsp;afterAttendance: {comments: **String**, pain: **Number**}  
}  
  
После двоеточия идет тип данных значения этого ключа:  
- **String** - строка  
- **Date** - экземпляр класса new Date()  
- **Number** - целочисленное значение  
- **Boolean** - булевое значение  

Данные типа **Number** в ключах, отражающих динамику, записываются следующим образом:
- 0 - Хуже
- 1 - Так же
- 2 - Лучше
