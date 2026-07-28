package expo.modules.blurview.records

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class CornerRadii(
  @Field val topLeft: Float = 0f,
  @Field val topRight: Float = 0f,
  @Field val bottomRight: Float = 0f,
  @Field val bottomLeft: Float = 0f
) : Record
