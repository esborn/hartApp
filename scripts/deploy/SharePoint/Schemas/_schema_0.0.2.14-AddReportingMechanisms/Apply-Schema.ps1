Write-Output "Install new field 'Feedback and reporting mechanisms'..."

$fieldName = "ReportingMechanisms"
$fieldXml = '<Field ID="{3bcdda8a-9eac-470e-84ac-79e0fc8e36b2}" Type="Text" MaxLength="255" Name="ReportingMechanisms" StaticName="ReportingMechanisms" DisplayName="Feedback and reporting mechanisms" Group="_OMT" EnforceUniqueValues="FALSE" Indexed="FALSE" Required="FALSE" ShowInDisplayForm="TRUE" ShowInEditForm="TRUE" ShowInListSettings="TRUE" ShowInNewForm="TRUE" SourceID="{91a6f2df-85d7-4f00-a361-b5c47daee9fd}" />';
                                                                                        

$field = Get-PnPField -Identity $fieldName -ErrorAction SilentlyContinue

if ($field -eq $null) {
    Write-Output "Field doesn't exist... installing"
    $field = Add-PnPFieldFromXml -FieldXml $fieldXml
    $field = Get-PnPField -Identity $fieldName
}
else {
    Write-Output "Field already exists."
}


Write-Output "Ensure field exists on ContentType..."
$contentType = Get-PnPContentType -Identity "0x010058E509FD027BB34198A673106C69CACA"
$contentTypeFields = Get-PnPProperty -ClientObject $contentType -Property "Fields"

$ctField = $contentTypeFields | Where-Object { $_.InternalName -eq $fieldName }
if ($ctField -eq $null) {
    Write-Output "Field doesn't exist on ContentType... installing '$($fieldName)'"
    $ctField = Add-PnPFieldToContentType -Field $field -ContentType $contentType    
    Write-Output "Field '$($fieldName)' installed."
}

#changed


