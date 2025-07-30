const {
  S3Client,
  CreateBucketCommand,
  PutBucketVersioningCommand,
  PutBucketPolicyCommand,
  PutBucketCorsCommand,
  PutBucketEncryptionCommand,
  PutBucketLifecycleConfigurationCommand,
  PutBucketTaggingCommand,
  PutBucketLoggingCommand,
  PutBucketNotificationConfigurationCommand,
  PutBucketReplicationCommand,
} = require('@aws-sdk/client-s3');

const REGION = process.env.AWS_REGION || 'us-west-2';

const s3Client = new S3Client({ region: REGION });

async function configureS3Bucket(config) {
  const bucketName = config.BucketName;

  // 1. Create Bucket
  await s3Client.send(new CreateBucketCommand({
    Bucket: bucketName,
    ACL: config.ACL || 'private',
  }));

  // 2. Versioning
  if (config.VersioningConfiguration) {
    await s3Client.send(new PutBucketVersioningCommand({
      Bucket: bucketName,
      VersioningConfiguration: config.VersioningConfiguration,
    }));
  }

  // 3. Logging
  if (config.LoggingConfiguration) {
    await s3Client.send(new PutBucketLoggingCommand({
      Bucket: bucketName,
      BucketLoggingStatus: {
        LoggingEnabled: config.LoggingConfiguration,
      },
    }));
  }

  // 4. Server Side Encryption
  if (config.ServerSideEncryptionConfiguration) {
    await s3Client.send(new PutBucketEncryptionCommand({
      Bucket: bucketName,
      ServerSideEncryptionConfiguration: config.ServerSideEncryptionConfiguration,
    }));
  }

  // 5. Lifecycle
  if (config.LifecycleConfiguration) {
    await s3Client.send(new PutBucketLifecycleConfigurationCommand({
      Bucket: bucketName,
      LifecycleConfiguration: config.LifecycleConfiguration,
    }));
  }

  // 6. CORS
  if (config.CORSConfiguration) {
    await s3Client.send(new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: config.CORSConfiguration,
    }));
  }

  // 7. Policy
  if (config.Policy) {
    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(config.Policy),
    }));
  }

  // 8. Tagging
  if (config.Tagging) {
    await s3Client.send(new PutBucketTaggingCommand({
      Bucket: bucketName,
      Tagging: config.Tagging,
    }));
  }

  // 9. Notification
  if (config.NotificationConfiguration) {
    await s3Client.send(new PutBucketNotificationConfigurationCommand({
      Bucket: bucketName,
      NotificationConfiguration: config.NotificationConfiguration,
    }));
  }

  // 10. Replication
  if (config.ReplicationConfiguration) {
    await s3Client.send(new PutBucketReplicationCommand({
      Bucket: bucketName,
      ReplicationConfiguration: config.ReplicationConfiguration,
    }));
  }

  return { message: 'Bucket configured successfully using AWS SDK v3' };
}

module.exports = { configureS3Bucket };
