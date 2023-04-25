package com.ssafy.skyeye.data.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuildingUpdateDto {
    private Long buildingId;
    private String buildingEstablishment;
    private String userId;
    private String buildingName;
    private String buildingAddress;
}
