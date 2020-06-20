import json
import boto3

def grab_pic_text(event, context):
	filepath = event

	picbucket = "received-images"
	docName = filepath
	textract = boto3.client('textract')

	response = textract.detect_document_text(
		Document = {
		"s3Object":{
		"Bucket": picbucket,
		"Name":docName
		}
		})

		finish = ""

		for item in response["Blocks"]:
			if item["BlockType"] == "WORD":
				element = item["Text"] + " "
				finish += element

	return {
	"statusCode":200,
	"body":finish
	}
		
