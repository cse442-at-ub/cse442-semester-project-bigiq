package com.example.AnonMe.database;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.File;


public class S3DB {
    Region region = Region.US_EAST_2;
    S3Client s3;
    public S3DB(){
        setUp();
    }

    public void setUp (){
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create("AKIAICNYIVH6LXOPX46A",
                "2BJBn5JLJFgRFRbE7GuXSf1WlztBZFDAAuv37iUf");
        s3 = S3Client.builder().credentialsProvider(StaticCredentialsProvider
                .create(awsCreds)).region(region).build();
    }
    public void uploadFile(String path, String name){
        String bucket = "anonmebucket";
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket).key("Audio/"+ name +".mp3")
                .acl(ObjectCannedACL.PUBLIC_READ).build();
        File file = new File(path);
        s3.putObject(putObjectRequest, RequestBody.fromFile(file));
        System.out.println("uploaded file to s3");
    }
}
