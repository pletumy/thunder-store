package com.ueh.thunderstoreadmin.user.service;

import com.ueh.thunderstoreadmin.user.dto.CUserAddressDTO;
import com.ueh.thunderstoreadmin.user.mapper.CUserAddressMapper;
import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.model.CUserAddress;
import com.ueh.thunderstoreadmin.user.repository.CUserAddressRepository;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */

@Service
public class CUserAddressImpl implements CUserAddressService{
    @Autowired
    private CUserAddressRepository repository;

    @Autowired
    private CUserRepository userRepository;

    @Override
    public CUserAddressDTO update(String addressId, CUserAddressDTO dto) {
        Optional<CUserAddress> addressOpt = repository.findById(addressId);
        if(addressOpt.isEmpty())
            return null;

        CUserAddress newAddress = CUserAddressMapper.INSTANCE.update(dto, addressOpt.get());
        repository.save(newAddress);

        return CUserAddressMapper.INSTANCE.toDTO(newAddress);
    }

    @Override
    public boolean deleteById(String addressId) {
        try {
            Optional<CUserAddress> addressOpt = repository.findById(addressId);
            repository.delete(addressOpt.get());
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    @Override
    public List<CUserAddressDTO> createAddressByUserId(String userId, CUserAddressDTO dto) {
        Optional<CUser> userOpt = userRepository.findById(userId);

        if(userOpt.isEmpty())
            return null;

        CUser user = userOpt.get();

        CUserAddress address = CUserAddressMapper.INSTANCE.toEntity(dto);
        user.addAddress(address);
        CUser userEntity = userRepository.save(user);

        return userEntity.getUserAddress()
                .stream().map(a -> CUserAddressMapper.INSTANCE.toDTO(a))
                .collect(Collectors.toList());
    }

    @Override
    public List<CUserAddressDTO> setDefaultById(String userId,String addressId) {
        Optional<CUser> userOpt = userRepository.findById(userId);
        if(userOpt.isEmpty())
            return null;

        CUser user = userOpt.get();

        Optional<CUserAddress> addressOpt = repository.findById(addressId);
        if(addressOpt.isEmpty())
            return null;
        user.setDefaultAddress(addressOpt.get());
        userRepository.save(user);
        return user.getUserAddress()
                .stream().map(a -> CUserAddressMapper.INSTANCE.toDTO(a))
                .collect(Collectors.toList());
    }
}

