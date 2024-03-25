package com.ueh.thunderstoreadmin.user.service;

import com.ueh.thunderstoreadmin.common.dto.CPagingDTO;
import com.ueh.thunderstoreadmin.common.helper.PagingHelper;
import com.ueh.thunderstoreadmin.role.model.CRole;
import com.ueh.thunderstoreadmin.role.repository.CRoleRepository;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsAndRolesDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsUpdateDTO;
import com.ueh.thunderstoreadmin.user.mapper.CUserMapper;
import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */

@Service
public class CUserServiceImpl implements CUserService {
    @Autowired
    private CUserRepository repository;

    @Autowired
    private CRoleRepository roleRepository;

    @Override
    public CPagingDTO findAll(int page, int limit, String orderBy) {
        Pageable pageable = PagingHelper.getPageable(page,limit,orderBy);
        Page<CUser> usersPage = repository.findAll(pageable);
        return CPagingDTO
                .builder()
                .data(usersPage.stream()
                        .map(user -> CUserDetailsAndRolesDTO.builder().userDetails(CUserMapper.INSTANCE.toUserDetailsDTO(user)).roles(user.getRoles().stream().toList()).build())
                        .collect(Collectors.toList()))
                .total(usersPage.getTotalElements())
                .limit(limit)
                .page(page)
                .build();
    }

    @Override
    public CUserDetailsDTO getUserDetail(String userId) {
        Optional<CUser> userOpt = repository.findById(userId);
        if(userOpt.isEmpty())
            return null;

        return CUserMapper.INSTANCE.toUserDetailsDTO(userOpt.get());
    }
    @Override
    public CUserDetailsDTO getUserDetailsByUsername(String username) {
        Optional<CUser> userOpt = repository.findByUsername(username);
        if(userOpt.isEmpty())
            return null;
        CUser user = userOpt.get();
        CUserDetailsDTO dto =  CUserMapper.INSTANCE.toUserDetailsDTO(user);
        dto.setCartId(user.getCart().getId());
        return dto;
    }

    @Override
    public CUserDetailsDTO updateUserDetails(String userId, CUserDetailsUpdateDTO dto) {
        Optional<CUser> userOpt = repository.findById(userId);

        if(userOpt.isEmpty())
            return null;
        CUser user = userOpt.get();
        if(!dto.getPhone().equals(user.getPhone())) {
            Optional<CUser> existedUser = repository.findByPhone(dto.getPhone());
            if(existedUser.isPresent())
                return null;
        }

        CUser userUpdated = CUserMapper.INSTANCE.updateToUserDetails(dto,user);

        repository.save(userUpdated);
        CUserDetailsDTO userDetailsDTO = CUserMapper.INSTANCE.toUserDetailsDTO(userUpdated);
        userDetailsDTO.setCartId(userUpdated.getCart().getId());
        return userDetailsDTO;
    }

    @Override
    public CUserDetailsAndRolesDTO updateUser(String userId, CUserDetailsAndRolesDTO dto) {
        Optional<CUser> userOpt = repository.findById(userId);

        if(userOpt.isEmpty())
            return null;
        CUser user = userOpt.get();

        if(!dto.getUserDetails().getPhone().equals(user.getPhone())){
            Optional<CUser> userExisted = repository.findByPhone(dto.getUserDetails().getPhone());
            if(userExisted.isPresent())
                return null;
        }

        if(!dto.getUserDetails().getUsername().equals(user.getUsername())){
            Optional<CUser> userExisted = repository.findByUsername(dto.getUserDetails().getUsername());
            if(userExisted.isPresent())
                return null;
        }

        if(!dto.getUserDetails().getEmail().equals(user.getEmail())){
            Optional<CUser> userExisted = repository.findByEmail(dto.getUserDetails().getEmail());
            if(userExisted.isPresent())
                return null;
        }

        CUserMapper.INSTANCE.update(dto.getUserDetails(),user);
        Set<CRole> roles = new HashSet<>(user.getRoles());

        roles.stream()
                .filter(role -> dto.getRoles().stream().noneMatch(roleDto -> role.getId().equals(roleDto.getId())))
                .forEach(role -> user.removeRole(role));

        dto.getRoles().stream()
                .filter(roleDto -> roles.stream().noneMatch(role -> role.getId().equals(roleDto.getId())))
                .forEach(roleDto -> {
                    Optional<CRole> roleOpt = roleRepository.findById(roleDto.getId());
                    roleOpt.ifPresent(role -> user.addRole(role));
                });

        repository.save(user);
        return CUserDetailsAndRolesDTO.builder()
                .userDetails(CUserMapper.INSTANCE.toUserDetailsDTO(user))
                .roles(user.getRoles().stream().toList())
                .build();
    }
}

