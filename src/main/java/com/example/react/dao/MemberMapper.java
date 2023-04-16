package com.example.react.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.react.dto.MemberDTO;

@Mapper
public interface MemberMapper {

	public List<MemberDTO> memberList();
	
	public void insertMember(MemberDTO dto);
//	
//	public void updateMember(MemberDTO dto);
//	
//	public void deleteMember(int id);
//	
//	public MemberDTO findById(int id);
}
