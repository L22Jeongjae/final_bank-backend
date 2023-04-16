package com.example.react.dto;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="mvc_customer_tbl")
@Data		// => 설치
public class MemberDTO {
	
	@Id
	private String id;
	private String password;
	private String name;
	private String birthday;
	private String email;
	private String address;
	private String hp;
	private Date regDate;
	private String hpppddddd;
	
}
